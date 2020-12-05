const express = require('express');
const router = express.Router();
const request = require('request');
const multer = require('multer');
const path = require('path');
const convertFileToJSON = require('../helper');
const fs = require('fs');

//Browser detection for browser compatible
const browser = require('browser-detect');



const detectBrowser = (req,res,next) => {
    const result = browser(req.headers['user-agent']);
    // console.log(result);
    if (result) {
       if (result.name === 'chrome') {
           console.log('Browser: '+result.name+ ' OK!');
           next();
       } else if (result.name=== 'firefox') {
           console.log('Browser: '+result.name+ ' OK!');
           next();
       } else if (result.name=== 'node') {
           // console.log('Browser: '+result.name+ ' OK!');
           next();
       } else {
           res.render('browser-response');
       }
    }
};



const redirectLogin = (req,res,next) => {

    if(!req.session ||!req.session.token || !req.session.vorname || !req.session.nachname ) {
        res.render('login-response');
    } else {
        if (!req.session.checked || req.session.checked === false) {
            res.render('term-of-service');
        } else {
            next();
        }
    }

};


const redirectHome = (req,res,next) => {
    if(!req.session) {
        next();
    } else if(req.session.token && req.session.vorname && req.session.nachname) {
        if (!req.session.checked || req.session.checked===false) {
            res.redirect('/term-of-service');
        }
        else {
            res.redirect('/index');
        }
    } else {
        next();
    }
};


router.get('/', detectBrowser, redirectHome, (req, res) => {
    res.render("login");
});

router.get('/login',detectBrowser, redirectHome, (req, res) => {
    res.render("login");
});

// router.get('/', (req, res) => {
//     res.render("index");
// });

router.get('/term-of-service', redirectLogin, (req,res) => {
    // console.log(req.session.vorname);
    // console.log(req.session.nachname);

    res.render('term-of-service', {vorname : req.session.vorname, nachname : req.session.nachname});
});

router.post('/login', redirectHome, (req,res) => {

    const {username, password} = req.body;
    // console.log(req.body);
    let login= {};
    login.username= username;
    login.password= password; // TODO: hash

    let errors = [];

    // check required fields
    if (!username || !password) {
        errors.push({msg: 'Bitte alle Felder ausfüllen '})
    }
    if (errors.length > 0) {

        res.render('login', {
            errors,
            username,
            password
        })
    }
    else {
    try{
        request.post({
              header: {'Content-Type': 'application/json-patch+json', 'accept ': 'application/json'},
              url: ' https://ll-db-backend.c1.k8s.iavgroup.local/api/Auth/Login?',
              json: login
          }, function (error, response, body) {

              console.log(JSON.stringify(body));

              if (response !== undefined) {
                  console.log(response.statusCode);
                  console.log(body);
                  if (response.statusCode === 404 && body === "Password oder Username ist falsch") {
                      errors.push({msg: 'ungültige Anmeldeinformationen'});
                      res.status(404).render('login', {
                          errors,
                          username,
                          password
                      });
                  } else if (response.statusCode === 401) {
                      errors.push({msg: 'Sie haben keine Zugriffsberechtigung für diese Seite'});
                      res.status(401).render('authorisierung-response', {
                          errors
                      });
                  } else if (response.statusCode === 200) {
                      req.session.token = body.token;
                      req.session.vorname = body.vorname;
                      req.session.nachname = body.nachname;
                      res.status(200).render('term-of-service');
                  }
              } else {
                  res.render('error');
              }
          });

      }
   catch (error) {
       console.log(error);
       res.render('error');
   }
    }

});

router.get('/logout', redirectLogin, (req,res) => {
        req.session.destroy(err => {
            if (err) {
                return res.redirect('index');
            } else {
                let logout = "Abmeldung erfolgreich";
                res.clearCookie('sid');
                res.render('login', {logout})
            }
        });
});




router.post('/index', (req,res) => {
    // CHECK
    req.session.checked = req.body.checkbox;
    res.render('index', {vorname : req.session.vorname, nachname : req.session.nachname});
});

router.get('/index', redirectLogin, (req, res) => {
    res.render('index', {vorname : req.session.vorname, nachname : req.session.nachname});
});

router.post("/not-accept", (req, res) => {
    req.session.checked=false;
    res.render('not-accept-term', {vorname : req.session.vorname, nachname : req.session.nachname});
});

router.post('/result', redirectLogin, (req, res) => {
    console.log(req.body);
    let localURL = req.protocol + '://' + req.get('host');
    let url = 'https://ll-db-backend.c1.k8s.iavgroup.local/api/LessonsLearnedDb/text?text=';
    let searchString = req.body.search;
    let searchUrl = url + searchString;
    let encodeUrl=  encodeURI(searchUrl);
   request.get(encodeUrl, {'auth': {'bearer': req.session.token}} ,function (error, response, body) {

        try {
            if (response.statusCode === 401) {
                res.status(401).render('login-response');
            }
            else if (response.statusCode === 200) {
                let jsonData = JSON.parse(body);
                console.log(jsonData);

                res.status(200).render('result', {
                    posts: jsonData,
                    searchValue: req.body.search,
                    localUrl: localURL,
                    vorname : req.session.vorname, nachname : req.session.nachname
                });
            } else if (response.statusCode === 204) {
                res.status(204).render('result', {
                    searchValue: req.body.search,
                    key: req.body.search,
                vorname : req.session.vorname, nachname : req.session.nachname
                });
            }
        } catch (error) {
            console.log(error);
            res.render('error');
        }

    }) ;
});


router.get('/details', redirectLogin, (req, res) => {
    let url = 'https://ll-db-backend.c1.k8s.iavgroup.local/api/LessonsLearnedDb/hashId?hashId=';
    let hashId = req.query.hashId;
    console.log(hashId);
    let getUrl = url + hashId;

    request.get(getUrl, {'auth': {'bearer': req.session.token}},function (error, response, body) {
        // if(response.statusCode===401) {
        //     res.send("Bitte melden Sie sich erneut an!");
        // } else {
        try {
            if (response.statusCode === 401) {
                res.status(401).render('login-response');
            } else  if (response.statusCode === 200) {

                //replace Kundenname
                let temp = JSON.parse(body);
                let replaceString = temp.basisinfo.kunde;

                let newJson = body.replace(replaceString, "Kunde");


                let json = JSON.parse(newJson);
                res.status(200).render('details', {
                    posts: json,
                    vorname : req.session.vorname, nachname : req.session.nachname
                });

                }   else {
                res.render('error');
            }

        } catch (e) {
            console.log(e);
            res.render('error');
        }

    });

});


const fileFilter = function(req, file, cb) {
    // Accept xlsm. only
    if (!file.originalname.match(/\.(xlsm)$/)) {
        req.fileValidationError = 'Only Microsoft Excel File allowed';
        return cb(new Error('Only Microsoft Excel File allowed!'), false);
    }
    cb(null, true);
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

router.get('/upload-new-case', redirectLogin, (req,res) => {
// router.get('/test', (req,res) => {

    res.render('eingabemaske', {vorname : req.session.vorname, nachname : req.session.nachname});

});


router.post('/upload-new-case', redirectLogin, (req, res) => {
    // 'newCase' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: fileFilter }).single('newCase') ;


    upload(req, res, function(err) {
        console.log("hierzu");
        if (err) {
            return res.status(404).send(err.toString());
        }
        else if (req.fileValidationError) {
            return res.status(404).send(req.fileValidationError);
        }
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        else if (!req.file) {
            const error = new Error('Please upload a file');
            return res.status(404).send(error);
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        } else {
            try {
            let json = convertFileToJSON(req.file.path);

            //delete after converted to json-object
            fs.unlink(req.file.path, (err) => {
                    if (err) throw err;
                    console.log('uploaded file was deleted from local storage');
            });


            res.render('xlxs_to_eingabemaske', {
                posts: json, vorname : req.session.vorname, nachname : req.session.nachname
            });

            } catch (e) {
                console.log(e);
                res.render('fileupload-response', {
                    error: e,
                    vorname : req.session.vorname, nachname : req.session.nachname
                })
            }
        }
    });
});

router.post('/upload-new-case/preview/push/force=true', redirectLogin, (req,res) => {
    let localURL = req.protocol + '://' + req.get('host');
    try {
      request.post({
            header: {'Content-Type': 'application/json-patch+json', 'accept': 'text/plain'},
            url: ' https://ll-db-backend.c1.k8s.iavgroup.local/api/LessonsLearnedDb/addNewCase?force=true',
            json: req.session.jsonObj,
            auth:  {'bearer': req.session.token}
        }, function (error, response, body) {
            if (error) {
                res.render('fileupload-response', {
                    error: error,
                    vorname : req.session.vorname, nachname : req.session.nachname
                })
            }   else if (response.statusCode === 401) {
                res.render('login-response');
            }   else if (body.message === "LessonsLearned-Fall wurde in die Datenbank eingestellt") {
                res.render('fileupload-response', {
                    messageSuccess: body.message,
                    hashId: body.hashCode,
                    localUrl: localURL,
                    vorname : req.session.vorname, nachname : req.session.nachname
                })
            }
        });
    } catch (e) {
        res.render('fileupload-response', {
            error: e,
            vorname : req.session.vorname, nachname : req.session.nachname
        })
    }
});
router.post('/upload-new-case/preview/push', redirectLogin, (req,res)=> {
    let localURL = req.protocol + '://' + req.get('host');
    try {
    request.post ({
            header: {'Content-Type': 'application/json-patch+json', 'accept': 'text/plain'},
            url:' https://ll-db-backend.c1.k8s.iavgroup.local/api/LessonsLearnedDb/addNewCase?force=false',
        json: req.session.jsonObj, auth:  {'bearer': req.session.token}}, function (error,response,body) {
        console.log(response.statusCode);
        if (error) {
            console.log(error);
           res.render('fileupload-response', {
               error: error
           })
        } else if (response.statusCode === 401) {
            res.render('login-response');
        }else if (body.message === "Ähnlicher LessonsLearned-Fall in der Datenbank gefunden") {
            res.render('fileupload-response', {
                messageSame:body.message,
                hashId: body.hashCode,
                localUrl: localURL,
                vorname : req.session.vorname, nachname : req.session.nachname
            })
        } else if (body.message === "LessonsLearned-Fall wurde in die Datenbank eingestellt"){
            res.render('fileupload-response', {
                messageSuccess: body.message,
                hashId: body.hashCode,
                localUrl: localURL,
                vorname : req.session.vorname, nachname : req.session.nachname
            })
        }
    });
  } catch (e) {
        res.render('fileupload-response', {
            error: e, vorname : req.session.vorname, nachname : req.session.nachname
        })
    }
});

router.post('/upload-new-case/preview', redirectLogin, (req, res) => {
    let obj = {};

    obj.basisinfo = {};
    obj.basisinfo.oe = (req.body.oe!=="null" && req.body.oe !== undefined ? req.body.oe : ' ');
    obj.basisinfo.kunde= (req.body.kunde!=="null" && req.body.kunde !== undefined? req.body.kunde : ' ');
    obj.basisinfo.projekt= (req.body.projekt!=='null' && req.body.projekt !== undefined ? req.body.projekt : ' ');
    obj.basisinfo.gewerke={};
    obj.basisinfo.gewerke.fachgruppen={};
    obj.basisinfo.gewerke.fachgruppen.ausstattung= (req.body.ausstattung !=='null' && req.body.ausstattung !== undefined ? req.body.ausstattung : ' ');
    obj.basisinfo.gewerke.fachgruppen.karosserie=(req.body.karosserie!=="null" && req.body.karosserie !== undefined ? req.body.karosserie : ' ');
    obj.basisinfo.gewerke.fachgruppen.elektrikelektronik=(req.body.elektrikelektronik!=="null" && req.body.elektrikelektronik !== undefined ? req.body.elektrikelektronik : ' ');
    obj.basisinfo.gewerke.fachgruppen.fahrwerk=(req.body.fahrwerk!=="null"  && req.body.fahrwerk !== undefined? req.body.fahrwerk : ' ');
    obj.basisinfo.gewerke.fachgruppen.fahrerassistenz= (req.body.fahrerassistenz!=="null" && req.body.fahrerassistenz !== undefined ? req.body.fahrerassistenz : ' ');
    obj.basisinfo.gewerke.fachgruppen.antrieb=(req.body.antrieb!=="null"  && req.body.antrieb !== undefined? req.body.antrieb : ' ');
    obj.basisinfo.gewerke.gesamtfahrzeug={};
    obj.basisinfo.gewerke.gesamtfahrzeug.steuerung = (req.body.steuerung!=="null" && req.body.steuerung !== undefined ? req.body.steuerung : ' ');
    obj.basisinfo.gewerke.gesamtfahrzeug.absicherung = (req.body.absicherung!=="null"  && req.body.absicherung !== undefined? req.body.absicherung : ' ');
    obj.basisinfo.gewerke.gesamtfahrzeug.weitere = (req.body.weitere!=="null" && req.body.weitere !== undefined ? req.body.weitere : ' ');
    obj.basisinfo.gewerke.vorseriencenter = (req.body.vorseriencenter!=="null" && req.body.vorseriencenter !== undefined ? req.body.vorseriencenter : ' ');
    obj.basisinfo.gewerke.projektmanagement = (req.body.projektmanagement!=="null" && req.body.projektmanagement !== undefined ? req.body.projektmanagement : ' ');
    obj.basisinfo.gewerke.industrialisierung = (req.body.industrialisierung!=="null" && req.body.industrialisierung !== undefined ? req.body.industrialisierung : ' ');

    //positiv
    obj.positiv={}
    obj.positiv.thema1={};
    obj.positiv.thema1.titel="1 Zusammenarbeit im Projekt / Teamspirit und Konfliktkultur";
    getPosKom('thema1',req.body.poskommentarthema1);
    obj.positiv.thema2={};
    obj.positiv.thema2.titel="2 Zusammenarbeit mit dem Kunden / Spirit und Konfliktkultur";
    getPosKom('thema2',req.body.poskommentarthema2);
    obj.positiv.thema3={};
    obj.positiv.thema3.titel="3 Projektorganisation und Projektmanagement generell";
    getPosKom('thema3',req.body.poskommentarthema3);
    obj.positiv.thema4={};
    obj.positiv.thema4.titel="4 Projektkommunikation";
    getPosKom('thema4',req.body.poskommentarthema4);
    obj.positiv.thema5={};
    obj.positiv.thema5.titel="5 Ziele und Projektausrichtung";
    getPosKom('thema5',req.body.poskommentarthema5);
    obj.positiv.thema6={};
    obj.positiv.thema6.titel="6 Abläufe, Prozesse und Qualitätssicherung";
    getPosKom('thema6',req.body.poskommentarthema6);
    obj.positiv.thema7={};
    obj.positiv.thema7.titel="7 Rollen und Aufgabenverteilung";
    getPosKom('thema7',req.body.poskommentarthema7);
    obj.positiv.thema8={};
    obj.positiv.thema8.titel="8 Ressourcen";
    getPosKom('thema8',req.body.poskommentarthema8);
    obj.positiv.thema9={};
    obj.positiv.thema9.titel="9 Führung und Motivation";
    getPosKom('thema9',req.body.poskommentarthema9);
    obj.positiv.thema10={};
    obj.positiv.thema10.titel="10 Entwicklungsverständnis und Erstellung Liefergegenstände";
    getPosKom('thema10',req.body.poskommentarthema10);

    //negativ
    obj.negativ={};
    obj.negativ.thema1={};
    obj.negativ.thema1.titel="1 Zusammenarbeit im Projekt / Teamspirit und Konfliktkultur";
    getNev('thema1',req.body.nevkommentarthema1);
    obj.negativ.thema2={};
    obj.negativ.thema2.titel="2 Zusammenarbeit mit dem Kunden / Spirit und Konfliktkultur";
    getNev('thema2',req.body.nevkommentarthema2);
    obj.negativ.thema3={};
    obj.negativ.thema3.titel="3 Projektorganisation und Projektmanagement generell";
    getNev('thema3',req.body.nevkommentarthema3);
    obj.negativ.thema4={};
    obj.negativ.thema4.titel="4 Projektkommunikation";
    getNev('thema4',req.body.nevkommentarthema4);
    obj.negativ.thema5={};
    obj.negativ.thema5.titel="5 Ziele und Projektausrichtung";
    getNev('thema5',req.body.nevkommentarthema5);
    obj.negativ.thema6={};
    obj.negativ.thema6.titel="6 Abläufe, Prozesse und Qualitätssicherung";
    getNev('thema6',req.body.nevkommentarthema6);
    obj.negativ.thema7={};
    obj.negativ.thema7.titel="7 Rollen und Aufgabenverteilung";
    getNev('thema7',req.body.nevkommentarthema7);
    obj.negativ.thema8={};
    obj.negativ.thema8.titel="8 Ressourcen";
    getNev('thema8',req.body.nevkommentarthema8);
    obj.negativ.thema9={};
    obj.negativ.thema9.titel="9 Führung und Motivation";
    getNev('thema9',req.body.nevkommentarthema9);
    obj.negativ.thema10={};
    obj.negativ.thema10.titel="10 Entwicklungsverständnis und Erstellung Liefergegenstände";
    getNev('thema10',req.body.nevkommentarthema10);


    function getPosKom (them, array) {
        for (let i=1; i<=array.length;i++) {
            if (array[i-1] !== "" )
                obj.positiv[them]['kommentar'+i]=array[i-1];
            else
                obj.positiv[them]['kommentar'+i]=" ";
        }
    }
    function getNev (them, komm) {
        for (let i=1; i<=komm.length;i++) {
            if(komm[i-1] !=="") {
                obj.negativ[them]['kommentar'+ i] = komm[i - 1];
            } else {
                obj.negativ[them]['kommentar'+ i] = " ";
            }
            let array= req.body['massnahme'+them+'_kommentar'+i];
                for(let z=1;z<=array.length;z++) {
                    if (array[z-1] !== "") {
                        obj.negativ[them]['massnahme' + i + '_' + z] = array[z - 1];
                    } else {
                        obj.negativ[them]['massnahme' + i + '_' + z] = " ";
                    }
                }

        }
    }


    const {oe, kunde, projekt, ausstattung, karosserie,elektrikelektronik,fahrwerk,fahrerassistenz,antrieb,steuerung,absicherung,weitere,projektmanagement} = req.body;

    let errors= new Object();
    //check required fields
    if(!oe)
        errors.OE = true;
    if(!kunde)
        errors.Kunde=true;
    if (!projekt)
         errors.Projekt=true;
    if (!(ausstattung || karosserie ||elektrikelektronik || fahrwerk || fahrerassistenz ||antrieb))
        errors.Fachgruppen = true;
    if (!(steuerung ||absicherung || weitere))
        errors.Gesamtfahrzeug = true;
    if (!projektmanagement)
         errors.Projektmanagement = true;

    //console.log(Object.keys(errors).length);

    if(Object.keys(errors).length>0) {
        res.render ('xlxs_to_eingabemaske.ejs' , {
            errors,
            posts: obj,
            vorname : req.session.vorname, nachname : req.session.nachname
        })
    }
    else {


        try {
            req.session.jsonObj= obj;
            res.render('vorschau', {
                posts: req.session.jsonObj, vorname : req.session.vorname, nachname : req.session.nachname
            });

        } catch (e) {
            res.send("error!" + e)
        }
        //console.log(JSON.stringify(obj));
    }
});

module.exports = router;
