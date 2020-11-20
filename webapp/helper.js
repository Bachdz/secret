const xlsx = require("xlsx");

module.exports = function (myFile) {

    let wb = xlsx.readFile(myFile);
    let obj = new Object();

    //Basisinfo
    let wsBasis = wb.Sheets["Projekt-Basisinformationen"];

    obj.basisinfo={};
    obj.basisinfo.oe= (wsBasis['E1'] ? wsBasis['E1'].v : ' ');
    obj.basisinfo.kunde=(wsBasis['E3'] ? wsBasis['E3'].v : ' ');
    obj.basisinfo.projekt=(wsBasis['E5'] ? wsBasis['E5'].v : ' ');
    obj.basisinfo.gewerke={};
    obj.basisinfo.gewerke.fachgruppen={};
    obj.basisinfo.gewerke.fachgruppen.ausstattung=(wsBasis['E11'] ? wsBasis['E11'].v : ' ');
    obj.basisinfo.gewerke.fachgruppen.karosserie=(wsBasis['E12'] ? wsBasis['E12'].v : ' ');
    obj.basisinfo.gewerke.fachgruppen.elektrikelektronik=(wsBasis['E13'] ? wsBasis['E13'].v : ' ');
    obj.basisinfo.gewerke.fachgruppen.fahrwerk=(wsBasis['E14'] ? wsBasis['E14'].v : ' ');
    obj.basisinfo.gewerke.fachgruppen.fahrerassistenz=(wsBasis['E15'] ? wsBasis['E15'].v : ' ');
    obj.basisinfo.gewerke.fachgruppen.antrieb=(wsBasis['E16'] ? wsBasis['E16'].v : ' ');
    obj.basisinfo.gewerke.gesamtfahrzeug={};
    obj.basisinfo.gewerke.gesamtfahrzeug.steuerung=(wsBasis['E18'] ? wsBasis['E18'].v : ' ');
    obj.basisinfo.gewerke.gesamtfahrzeug.absicherung=(wsBasis['E19'] ? wsBasis['E19'].v : ' ');
    obj.basisinfo.gewerke.gesamtfahrzeug.weitere=(wsBasis['E20'] ? wsBasis['E20'].v : ' ');
    obj.basisinfo.gewerke.vorseriencenter=(wsBasis['E21'] ? wsBasis['E21'].v : ' ');
    obj.basisinfo.gewerke.projektmanagement=(wsBasis['E22'] ? wsBasis['E22'].v : ' ');
    obj.basisinfo.gewerke.industrialisierung=(wsBasis['E23'] ? wsBasis['E23'].v : ' ');


//positiv
    let wsPositiv = wb.Sheets["positiv"];
    obj.positiv={}
    obj.positiv.thema1={};
    obj.positiv.thema1.titel=(wsPositiv['B2'] ? wsPositiv['B2'].v : ' ');
    createKommentar("B3:B7",'thema1');
    obj.positiv.thema2={};
    obj.positiv.thema2.titel=(wsPositiv['B8'] ? wsPositiv['B8'].v : ' ');
    createKommentar("B9:B13",'thema2');
    obj.positiv.thema3={};
    obj.positiv.thema3.titel=(wsPositiv['B14'] ? wsPositiv['B14'].v : ' ');
    createKommentar("B15:B19",'thema3');
    obj.positiv.thema4={};
    obj.positiv.thema4.titel=(wsPositiv['B20'] ? wsPositiv['B20'].v : ' ');
    createKommentar("B21:B25",'thema4');
    obj.positiv.thema5={};
    obj.positiv.thema5.titel=(wsPositiv['B26'] ? wsPositiv['B26'].v : ' ');
    createKommentar("B27:B31",'thema5');
    obj.positiv.thema6={};
    obj.positiv.thema6.titel=(wsPositiv['B32'] ? wsPositiv['B32'].v : ' ');
    createKommentar("B33:B37",'thema6');
    obj.positiv.thema7={};
    obj.positiv.thema7.titel=(wsPositiv['B38'] ? wsPositiv['B38'].v : ' ');
    createKommentar("B39:B43",'thema7');
    obj.positiv.thema8={};
    obj.positiv.thema8.titel=(wsPositiv['B44'] ? wsPositiv['B44'].v : ' ');
    createKommentar("B45:B49",'thema8');
    obj.positiv.thema9={};
    obj.positiv.thema9.titel=(wsPositiv['B50'] ? wsPositiv['B50'].v : ' ');
    createKommentar("B51:B55",'thema9');
    obj.positiv.thema10={};
    obj.positiv.thema10.titel=(wsPositiv['B56'] ? wsPositiv['B56'].v : ' ');
    createKommentar("B57:B61",'thema10');

//negativ
    let wsNegativ = wb.Sheets["negativ + Maßnahmen"];
    obj.negativ={}
    obj.negativ.thema1={}
    obj.negativ.thema1.titel=(wsNegativ['B2'] ? wsNegativ['B2'].v : ' ');
    createMassnahme("B3:C7",'thema1');
    obj.negativ.thema2={}
    obj.negativ.thema2.titel=(wsNegativ['B8'] ? wsNegativ['B8'].v : ' ');
    createMassnahme("B9:C13",'thema2');
    obj.negativ.thema3={}
    obj.negativ.thema3.titel=(wsNegativ['B14'] ? wsNegativ['B14'].v : ' ');
    createMassnahme("B15:C19",'thema3');
    obj.negativ.thema4={}
    obj.negativ.thema4.titel=(wsNegativ['B20'] ? wsNegativ['B20'].v : ' ');
    createMassnahme("B21:C25",'thema4');
    obj.negativ.thema5={}
    obj.negativ.thema5.titel=(wsNegativ['B26'] ? wsNegativ['B26'].v : ' ');
    createMassnahme("B27:C31",'thema5');
    obj.negativ.thema6={}
    obj.negativ.thema6.titel=(wsNegativ['B32'] ? wsNegativ['B32'].v : ' ');
    createMassnahme("B33:C37",'thema6');
    obj.negativ.thema7={}
    obj.negativ.thema7.titel=(wsNegativ['B38'] ? wsNegativ['B38'].v : ' ');
    createMassnahme("B39:C43",'thema7');
    obj.negativ.thema8={}
    obj.negativ.thema8.titel=(wsNegativ['B44'] ? wsNegativ['B44'].v : ' ');
    createMassnahme("B45:C49",'thema8');
    obj.negativ.thema9={}
    obj.negativ.thema9.titel=(wsNegativ['B50'] ? wsNegativ['B50'].v : ' ');
    createMassnahme("B51:C55",'thema9');
    obj.negativ.thema10={}
    obj.negativ.thema10.titel=(wsNegativ['B56'] ? wsNegativ['B56'].v : ' ');
    createMassnahme("B57:C61",'thema10');


    function createKommentar(range,them){
        wsPositiv['!ref'] = range;
        let array =xlsx.utils.sheet_to_json(wsPositiv, {header:1});
        for (var i=1; i<=array.length;i++) {
            if (array[i-1].length !==0 )
                obj.positiv[them]['kommentar'+i]=array[i-1].toString();
            else
                obj.positiv[them]['kommentar'+i]=" ";
        }
    }

    function createMassnahme(range,them) {
        wsNegativ['!ref'] = range;
        let array=xlsx.utils.sheet_to_json(wsNegativ,{header:1})
        for (var i=0; i<array.length; i++) {
            var temp = array[i];
            if (temp.length!==0 ) {
                if(temp[0] !== undefined) {
                obj.negativ[them]['kommentar'+(i+1)]=temp[0].toString();
                } else {
                    obj.negativ[them]['kommentar'+(i+1)]= " ";
                }

                if(temp[1] !== undefined) {
                    var massnahme = temp[1].split(/\r?\n/);
                    for (var y =1; y<=10; y++) {
                        if (massnahme[y-1] !== undefined) {
                            obj.negativ[them]['massnahme'+(i+1)+'_'+y]=massnahme[y-1];
                        }
                        else
                            obj.negativ[them]['massnahme'+(i+1)+'_'+y]=" ";
                    }
                } else {
                    for (var y=1; y<=10; y++ ){
                        obj.negativ[them]['massnahme'+(i+1)+'_'+y]= " ";
                    }
                }
            }
            else {
                obj.negativ[them]['kommentar'+(i+1)]=" ";
                for (var y=1; y<=10; y++ ){
                    obj.negativ[them]['massnahme'+(i+1)+'_'+y]= " ";
                }
            }
        }
    }

    return obj;
};