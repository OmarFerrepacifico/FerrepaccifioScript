/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 *
 */

define(['N/query', 'N/log', 'N/ui/serverWidget', 'N/runtime'], function(query, log, serverWidget, runtime){

  function onRequest(context){

        var delimiter     = /\u0005/;
    
    var id_Art        = context.request.method == 'POST' ? context.request.parameters.custpage_field_id_articulo : "";
        var marca1        = context.request.method == 'POST' ? context.request.parameters.custpage_marca : "";
    var sub_linea     = context.request.method == 'POST' ? context.request.parameters.custpage_sublinea.split(delimiter) : '';
    var linea_principal   = context.request.method == 'POST' ? context.request.parameters.custpage_linea_principal : "";
    /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 05/07/2023-----------------------*/
    var ncp   = context.request.method == 'POST' ? context.request.parameters.custpage_nombre_corto_proveedor : "";

var Fam   = context.request.method == 'POST' ? context.request.parameters.custpage_familia : "";  
var Sub_Fam   = context.request.method == 'POST' ? context.request.parameters.custpage_sub_familia : "";  
/*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 05/07/2023-----------------------*/
  var id_comprador    = context.request.method == 'POST' ? context.request.parameters.custpage_comprador : "";
    var id_proveedor    = context.request.method == 'POST' ? context.request.parameters.custpage_proveedor : "";
    var id_clasificacion  = context.request.method == 'POST' ? context.request.parameters.custpage_clasificacion : "";
     var f_Inicio     = context.request.method == 'POST' ? context.request.parameters.custpage_field_inicio : fechaHoy();
    var f_Final       = context.request.method == 'POST' ? context.request.parameters.custpage_field_final : fechaHoy();
    var anio        = f_Final.split("/")[2];
    var mes         = f_Final.split("/")[1];
    var dia         = f_Final.split("/")[0];


  var anio_ini        = f_Inicio.split("/")[2];
    var mes_ini       = f_Inicio.split("/")[1];
    var dia_ini         = f_Inicio.split("/")[0];

    var noRowInicio     = 0;
    var noRowFinal      = 999999;
    var records       = new Array();
    var form        = serverWidget.createForm({
      title: 'Nivelacion de Inventarios',
      hideNavBar: false
    });

    /** Grupos */
    var fieldgroup = form.addFieldGroup({
      id : 'grupofiltros',
      label : 'Filtros'
    });
    var fieldgroup = form.addFieldGroup({
      id : 'grupotabla',
      label : 'Resultados'
    });

    form.addSubmitButton( { label: 'Generar Reporte' } );

    


    var nombre_corto_proveedor = form.addField({
      id: "custpage_nombre_corto_proveedor",
      type: serverWidget.FieldType.SELECT,
      label: "nombre_corto_proveedor",
      source: "CUSTOMRECORD671",
      container: 'grupofiltros'
    }).setHelpText({ help: "Obtener El nombre_corto_proveedors" });
    nombre_corto_proveedor.isMandatory = false;
    nombre_corto_proveedor.defaultValue = ncp;



/*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 04/07/2023-----------------------*/

    var lineaprincipal = form.addField({
      id: "custpage_linea_principal",
      type: serverWidget.FieldType.SELECT,
      label: "Línea",
      source: "CUSTOMRECORD_BEX_LINEAS_ARTICULOS",
      container: 'grupofiltros'
    }).setHelpText({ help: "Obtener los artículos de una línea completa" });
    lineaprincipal.isMandatory = false;
    lineaprincipal.defaultValue = linea_principal;



    
    var sublineas = form.addField({
      id: "custpage_sublinea",
      type: serverWidget.FieldType.MULTISELECT,
      label: "Sub línea",
      source: "CUSTOMRECORD_BEX_SUBLINEA",
      container: 'grupofiltros'
    }).setHelpText({ help: "Obtener los artículos de una sub-línea completa" });
    sublineas.isMandatory = false;
    sublineas.defaultValue = sub_linea;



  var marc1a = form.addField({
      id: "custpage_marca",
      type: serverWidget.FieldType.SELECT,
      label: "marca",
      source: "customrecord681",
      container: 'grupofiltros'
    }).setHelpText({ help: "Obtener El marca" });
    marc1a.isMandatory = false;
    marc1a.defaultValue = marca1;


//cambio de sublinea de seleccion a multi seleccion






/*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 04/07/2023-----------------------*/


/*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 04/07/2023-----------------------*/

    var Desde = form.addField({
      id: 'custpage_field_inicio',
      type: serverWidget.FieldType.DATE,
      label: 'Desde',
      container: 'grupofiltros'
    }).setHelpText({ help: "Se obtendrá el cálculo de todo el año que se seleccione en el campo 'Hasta', hasta el mes seleccionado" });
    Desde.isMandatory = false;
    Desde.defaultValue = f_Inicio;

    var fechaFinal = form.addField({
      id: 'custpage_field_final',
      type: serverWidget.FieldType.DATE,
      label: 'Hasta',
      container: 'grupofiltros'
    }).setHelpText({ help: "Se obtendrá el cálculo de todo el año que se seleccione en el campo 'Hasta', hasta el mes seleccionado" });
    fechaFinal.isMandatory = true;
    fechaFinal.defaultValue = f_Final;
    if (context.request.method == 'POST') {
      var coluna=""


var valor_subl=sub_linea.length 
var val_validacion =  "AND itm.custitem_bex_sublinea IN("+sub_linea+")"
var validador = 0
if( val_validacion=="AND itm.custitem_bex_sublinea IN()")
{validador=0
  coluna="  "
}
else {
  validador=1
   
}

 


      ventadias=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) AS "+
          " cantidad_venta_piezas, "+
          " ";

   ventadias_cantamar=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) AS "+
          " cantidad_venta_piezas_cantamar, "+
          " ";


   ventadias_la_Huerta=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) AS "+
          " cantidad_venta_piezas_la_HTA, "+
          " ";
            ventadias_Villa_Purificacion=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) AS "+
          " cantidad_venta_piezas_Villa_Purificacion, "+
          " ";

    ventadias_Fondeport=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) AS "+
          " cantidad_venta_piezas_Fondeport, "+
          " ";
    
      ventadias_Monterrey=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) AS "+
          " cantidad_venta_Monterrey, "+
          " ";
    


  
      ventadias_Tlaquepaque=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) AS "+
          " cantidad_venta_Tlaquepaque, "+
          " ";
        

      ventadias_Melaque=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) AS "+
          " cantidad_venta_MLQ, "+
          " ";

      ventadias_Autlan=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) AS "+
          " cantidad_Autlan, "+
          " ";

var valor_cc=""

if(marca1==2){
valor_cc="Xtools"}
if(marca1==1){
valor_cc="Truper"}
if(marca1==3){
valor_cc="Xtools"}
if(marca1==4){
valor_cc="Xtools"}
        
var wh=""
if(marca1!=""){
wh="  join customrecord681 on consulta1.custitem15 = customrecord681.id where customrecord681.id="+marca1+""
}else{ wh=""}
         var dias1432 =Dias_diferencia(f_Inicio, f_Final);
            var dias143222 =contarDomingos(f_Inicio, f_Final);
      var ff111=Dias_diferencia(f_Inicio, f_Final);
          var valor_dedia=0
    if(dias1432==0){
      valor_dedia=1
    }else(
valor_dedia=(dias1432*2)-dias143222
      )
    innerHtml = "";

    var dias2222=dias1432+1
      ventadias_Dias=  "ROUND ( SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) / "+dias2222+") AS "+
          " Venta_Por_Dia ,"+
  " ";
//////////////
  ventadias_Dias_Real=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0.0000001 "+
          " END) / "+dias2222+" AS "+
          " Dias_de_inventario "+

  " ";

          ///////////




/////////

          " ";
           ventadias_Dias_c=   "ROUND ( (N1.stockDisponible)   /(SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0.0000001 "+
          " END) / "+dias2222+"))  AS "+
          " dias_invent_cantamar "+
          " ";

         ventadias_Dias_h=   "ROUND ( (N1.stockDisponible)   /(SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0.0000001 "+
          " END) / "+dias2222+"))  AS "+
          " dias_invent_La_huerta "+
          " ";
ventadias_Dias_p=   "ROUND ( (N1.stockDisponible)   /(SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0.0000001 "+
          " END) / "+dias2222+"))  AS "+
          " dias_invent_Villa_Purificacion "+
          " ";
          ventadias_Dias_f=   "ROUND ( (N1.stockDisponible)   /(SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0.0000001 "+
          " END) / "+dias2222+"))  AS "+
          " dias_invent_Fondeport "+
          " ";
             ventadias_Dias_m=   "ROUND ( (N1.stockDisponible)   /(SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0.0000001 "+
          " END) / "+dias2222+"))  AS "+
          " dias_invent_Monterrey "+
          " ";
             ventadias_Dias_t=   "ROUND ( (N1.stockDisponible)   /(SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0.0000001 "+
          " END) / "+dias2222+"))  AS "+
          " dias_invent_Tlaquepaque "+
          " ";
           ventadias_Dias_mm=   "ROUND ( (N1.stockDisponible)   /(SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0.0000001 "+
          " END) / "+dias2222+"))  AS "+
          " dias_invent_Melaque "+
          " ";
           ventadias_Dias_a=   "ROUND ( (N1.stockDisponible)   /(SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0.0000001 "+
          " END) / "+dias2222+"))  AS "+
          " dias_invent_Autlan "+
          " ";
/*

/
  Venta_total
"+

cantidad_de_venta_en_piezas
Venta_Por_Dia

sql_Tlaquepaque
sql_Melaque
sql_Autlan  + N4.stock_La_Huerta*/

      /** SQL principal */
  const consultaSQL = "SELECT  "+
"     consulta1.displayname codigo, "+
"     consulta1.description nombre, "+
"     consulta1.Venta_total - (terminos1.Venta_total +terminos2.Venta_total) Vtas_tot ,"+
"     consulta1.cantidad_de_venta_en_piezas cant_Vtas_pz, "+
"       ROUND(consulta1.Venta_Por_Dia) Vtas_x_Dia, "+
  "ROUND ((SELECT  SUM(quantityavailable) FROM inventoryitemlocations WHERE inventoryitemlocations.Item = consulta1.id  AND location IN (6,2,4,5,1,3,23))) AS stock, "+


"    CASE "+
"         WHEN consulta1.Venta_Por_Dia != 0 THEN "+
"            ROUND(consulta1.stock / consulta1.Venta_Por_Dia) "+
"         ELSE "+
"             0  "+
"     END AS dias_invent, "+
"   consulta5.Venta_total AS Vtas_tot_FDP, "+
"        COALESCE(consulta5.cantidad_de_venta_en_piezas,0) AS cant_vtas_pz_fdp, "+
"       COALESCE(consulta5.Venta_Por_Dia,0) AS vtas_x_dia_fdp, "+
 "ROUND ((SELECT  quantityavailable FROM inventoryitemlocations WHERE inventoryitemlocations.Item = consulta1.id  AND location = 5)) as stock_fdp,"+
"        CASE "+
"         WHEN consulta5.Venta_Por_Dia != 0 THEN "+
"             ROUND((SELECT  quantityavailable FROM inventoryitemlocations WHERE inventoryitemlocations.Item = consulta1.id  AND location = 5)  / consulta5.Venta_Por_Dia) "+
"         ELSE "+
"             0  "+
"     END AS dias_invent_FDP, "+
"     consulta2.Venta_total AS Vtas_tot_CTM, "+
"       COALESCE(consulta2.cantidad_de_venta_en_piezas,0) AS cant_vtas_pz_ctm, "+
"      ROUND( COALESCE( consulta2.Venta_Por_Dia,0)) AS vtas_x_dia_ctm, "+
  "ROUND ((SELECT  quantityavailable FROM inventoryitemlocations WHERE inventoryitemlocations.Item = consulta1.id  AND location = 6)) as stock_ctm,"+
" CASE "+
"         WHEN consulta2.Venta_Por_Dia != 0 THEN "+
"             ROUND((SELECT  quantityavailable FROM inventoryitemlocations WHERE inventoryitemlocations.Item = consulta1.id  AND location = 6)  / consulta2.Venta_Por_Dia) "+
"         ELSE "+
"             0  "+
"     END AS dias_invent_CTM, "+
"     consulta7.Venta_total AS Vtas_tot_MLQ, "+
"        COALESCE(consulta7.cantidad_de_venta_en_piezas,0) AS cant_vtas_pz_mlq, "+
"       COALESCE(consulta7.Venta_Por_Dia,0) AS vtas_x_dia_mlq, "+
 "ROUND ((SELECT  quantityavailable FROM inventoryitemlocations WHERE inventoryitemlocations.Item = consulta1.id  AND location = 3)) as stock_mlq,"+

"        CASE "+
"         WHEN consulta7.Venta_Por_Dia != 0 THEN "+
"             ROUND((SELECT  quantityavailable FROM inventoryitemlocations WHERE inventoryitemlocations.Item = consulta1.id  AND location = 3) / consulta7.Venta_Por_Dia) "+
"         ELSE "+
"             0  "+
"     END AS dias_invent_MLQ, "+
"        consulta3.Venta_total AS Vtas_tot_hta, "+
"        COALESCE(consulta3.cantidad_de_venta_en_piezas,0) AS cant_vtas_pz_hta, "+
"       COALESCE(consulta3.Venta_Por_Dia,0) AS vtas_x_dia_hta, "+

 "ROUND ((SELECT  quantityavailable FROM inventoryitemlocations WHERE inventoryitemlocations.Item = consulta1.id  AND location = 2)) as stock_hta,"+
"       CASE "+
"         WHEN consulta3.Venta_Por_Dia != 0 THEN "+
"             ROUND((SELECT  quantityavailable FROM inventoryitemlocations WHERE inventoryitemlocations.Item = consulta1.id  AND location = 2) / consulta3.Venta_Por_Dia) "+
"         ELSE "+
"             0  "+
"     END AS dias_invent_HTA, "+
"     consulta8.Venta_total AS Vtas_tot_MAY, "+
"        COALESCE(consulta8.cantidad_de_venta_en_piezas,0) AS cant_vtas_pz_may, "+
"       COALESCE(consulta8.Venta_Por_Dia,0) AS vtas_x_dia_may, "+
 "ROUND ((SELECT  quantityavailable FROM inventoryitemlocations WHERE inventoryitemlocations.Item = consulta1.id  AND location = 23)) as stock_may,"+

"        CASE "+
"         WHEN consulta8.Venta_Por_Dia != 0 THEN "+
"             ROUND((SELECT  quantityavailable FROM inventoryitemlocations WHERE inventoryitemlocations.Item = consulta1.id  AND location = 23) / consulta8.Venta_Por_Dia) "+
"         ELSE "+
"             0  "+
"     END AS dias_invent_MAY ,"+
"        consulta4.Venta_total AS Vtas_tot_VLA, "+
"        COALESCE(consulta4.cantidad_de_venta_en_piezas,0) AS cant_vtas_pz_vla, "+
"       COALESCE(consulta4.Venta_Por_Dia,0) AS vtas_x_dia_vla, "+

 "ROUND ((SELECT  quantityavailable FROM inventoryitemlocations WHERE inventoryitemlocations.Item = consulta1.id  AND location = 4)) as stock_vla,"+
" CASE "+
"         WHEN consulta4.Venta_Por_Dia != 0 THEN "+
"             ROUND((SELECT  quantityavailable FROM inventoryitemlocations WHERE inventoryitemlocations.Item = consulta1.id  AND location = 4)  / consulta4.Venta_Por_Dia) "+
"         ELSE "+
"             0  "+
"     END AS dias_invent_VLA, "+

"       consulta6.Venta_total AS Vtas_tot_TLQ, "+
"        COALESCE(consulta6.cantidad_de_venta_en_piezas,0) AS cant_vtas_pz_tlq, "+
"       COALESCE(consulta6.Venta_Por_Dia,0) AS vtas_x_dia_tlq, "+
 "ROUND ((SELECT  quantityavailable FROM inventoryitemlocations WHERE inventoryitemlocations.Item = consulta1.id  AND location = 1)) as stock_tlq,"+

"       CASE "+
"         WHEN consulta6.Venta_Por_Dia != 0 THEN "+
"             ROUND((SELECT  quantityavailable FROM inventoryitemlocations WHERE inventoryitemlocations.Item = consulta1.id  AND location = 1)/ consulta6.Venta_Por_Dia) "+
"         ELSE "+
"             0  "+
"     END AS dias_invent_TLQ, "+
"  "+



"     consulta1.Venta_total as ultmo "+

"     FROM "+
"     (         "+
"         SELECT "+
"             itm.id, "+
"             itm.displayname, "+
"             itm.description, "+
"             itm.custitem15, "+

"             SUM(netamount*-1) Venta_total, "+
"             ROUND(SUM(TransactionLine.quantity*-1)) cantidad_de_venta_en_piezas, "+
"             ROUND(SUM(TransactionLine.quantity*-1)/"+Math.round(valor_dedia)+",2) Venta_Por_Dia, "+
"             (SELECT  ROUND(sum(quantityavailable)) FROM inventoryitemlocations WHERE inventoryitemlocations.Item = TransactionLine.Item) AS stock "+
"         FROM "+
"             TransactionLine "+
"             JOIN Transaction ON Transaction.id = TransactionLine.Transaction "+
"             JOIN item AS itm ON itm.ID = TransactionLine.Item "+
"             INNER JOIN location AS loc ON loc.id = TransactionLine.location "+
"     LEFT JOIN CUSTOMRECORD_BEX_SUBLINEA AS sbl ON sbl.id = itm.custitem_bex_sublinea "+   

"         WHERE "+
"             Transaction.type IN ('CustInvc', 'CustCred') "+
"             AND Transaction.tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
"             AND Transaction.tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
"             AND itm.description IS NOT NULL "+
"             AND itm.displayname != 'SAA' "+
"             AND itm.displayname != 'RM' "+
"             AND itm.itemtype = 'InvtPart' "+
"             AND itm.isinactive = 'F' "+
"             AND loc.id IN (6,2,4,5,1,3,23) "+
 (linea_principal.length   > 0 ? "AND itm.custitem_bex_tipo_articulo = '"+linea_principal+"' " : "")+
      
              /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 05/07/2023-----------------------*/
              (ncp    > 0 ? "AND itm.custitem10           = '"+ncp+"' "   : "")+
              
                                (validador  ==1 ? "AND sbl.id IN("+sub_linea+") "   : "")+
"         GROUP BY "+
"             TransactionLine.Item, "+
"             itm.displayname, "+
"             itm.description , itm.id,custitem15"+
"     ) AS consulta1 "+

/////////////
"    LEFT JOIN "+
"(SELECT "+
"             itm.id, "+
"             itm.displayname, "+
"             itm.description, "+
"             itm.custitem15, "+

"             SUM(netamount*-1) Venta_total, "+
"             ROUND(SUM(TransactionLine.quantity*-1)) cantidad_de_venta_en_piezas, "+
"             ROUND(SUM(TransactionLine.quantity*-1)/"+Math.round(valor_dedia)+",2) Venta_Por_Dia, "+
"             (SELECT  ROUND(sum(quantityavailable)) FROM inventoryitemlocations WHERE inventoryitemlocations.Item = TransactionLine.Item) AS stock "+
"         FROM "+
"             TransactionLine "+
"             JOIN Transaction ON Transaction.id = TransactionLine.Transaction "+
"             JOIN item AS itm ON itm.ID = TransactionLine.Item "+
"             INNER JOIN location AS loc ON loc.id = TransactionLine.location "+
"     LEFT JOIN CUSTOMRECORD_BEX_SUBLINEA AS sbl ON sbl.id = itm.custitem_bex_sublinea "+   

"         WHERE "+
"             Transaction.type IN ('CustInvc', 'CustCred') "+
"             AND Transaction.tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
"             AND Transaction.tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
"             AND itm.description IS NOT NULL "+
"             AND itm.displayname != 'SAA' "+
"             AND itm.displayname != 'RM' "+
"             AND itm.itemtype = 'InvtPart' "+
"             AND itm.isinactive = 'F' "+
"             AND loc.id IN (6,2,4,5,1,3,23)  and terms not  in(4,20 )   "+
 (linea_principal.length   > 0 ? "AND itm.custitem_bex_tipo_articulo = '"+linea_principal+"' " : "")+
      
              /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 05/07/2023-----------------------*/
              (ncp    > 0 ? "AND itm.custitem10           = '"+ncp+"' "   : "")+
              
                                (validador  ==1 ? "AND sbl.id IN("+sub_linea+") "   : "")+
"         GROUP BY "+
"             TransactionLine.Item, "+
"             itm.displayname, "+
"             itm.description , itm.id,custitem15"+
"     ) AS terminos1  ON consulta1.displayname = terminos1.displayname  "+

/****************** */
"    LEFT JOIN "+
"(SELECT "+
"             itm.id, "+
"             itm.displayname, "+
"             itm.description, "+
"             itm.custitem15, "+

"             SUM(netamount*.95) Venta_total, "+
"             ROUND(SUM(TransactionLine.quantity*-1)) cantidad_de_venta_en_piezas, "+
"             ROUND(SUM(TransactionLine.quantity*-1)/"+Math.round(valor_dedia)+",2) Venta_Por_Dia, "+
"             (SELECT  ROUND(sum(quantityavailable)) FROM inventoryitemlocations WHERE inventoryitemlocations.Item = TransactionLine.Item) AS stock "+
"         FROM "+
"             TransactionLine "+
"             JOIN Transaction ON Transaction.id = TransactionLine.Transaction "+
"             JOIN item AS itm ON itm.ID = TransactionLine.Item "+
"             INNER JOIN location AS loc ON loc.id = TransactionLine.location "+
"     LEFT JOIN CUSTOMRECORD_BEX_SUBLINEA AS sbl ON sbl.id = itm.custitem_bex_sublinea "+   

"         WHERE "+
"             Transaction.type IN ('CustInvc', 'CustCred') "+
"             AND Transaction.tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
"             AND Transaction.tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
"             AND itm.description IS NOT NULL "+
"             AND itm.displayname != 'SAA' "+
"             AND itm.displayname != 'RM' "+
"             AND itm.itemtype = 'InvtPart' "+
"             AND itm.isinactive = 'F' "+
"             AND loc.id IN (6,2,4,5,1,3,23)  and terms not  in(4,20 )   "+
 (linea_principal.length   > 0 ? "AND itm.custitem_bex_tipo_articulo = '"+linea_principal+"' " : "")+
      
              /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 05/07/2023-----------------------*/
              (ncp    > 0 ? "AND itm.custitem10           = '"+ncp+"' "   : "")+
              
                                (validador  ==1 ? "AND sbl.id IN("+sub_linea+") "   : "")+
"         GROUP BY "+
"             TransactionLine.Item, "+
"             itm.displayname, "+
"             itm.description , itm.id,custitem15"+
"     ) AS terminos2  ON consulta1.displayname = terminos2.displayname  "+

/******************* */


//////////
"    LEFT JOIN "+
"     (         "+
"         SELECT "+
"             itm.displayname, "+
"             itm.description, "+
"             SUM(netamount*-1) Venta_total, "+
"             ROUND(SUM(TransactionLine.quantity*-1)) cantidad_de_venta_en_piezas, "+
"             ROUND(SUM(TransactionLine.quantity*-1)/"+Math.round(valor_dedia)+",2) Venta_Por_Dia, "+
"             (SELECT  quantityavailable FROM inventoryitemlocations WHERE inventoryitemlocations.Item = 28143 AND location = 6) AS stock "+
"         FROM "+
"             TransactionLine "+
"             JOIN Transaction ON Transaction.id = TransactionLine.Transaction "+
"             JOIN item AS itm ON itm.ID = TransactionLine.Item "+
"             INNER JOIN location AS loc ON loc.id = TransactionLine.location "+
"     LEFT JOIN CUSTOMRECORD_BEX_SUBLINEA AS sbl ON sbl.id = itm.custitem_bex_sublinea "+   
"         WHERE "+
"             Transaction.type IN ('CustInvc', 'CustCred') "+
"             AND Transaction.tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
"             AND Transaction.tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
"             AND itm.description IS NOT NULL "+
"             AND itm.displayname != 'SAA' "+
"             AND itm.displayname != 'RM' "+
"             AND itm.itemtype = 'InvtPart' "+
"             AND itm.isinactive = 'F' "+
"             AND loc.id IN (6) "+
 (linea_principal.length   > 0 ? "AND itm.custitem_bex_tipo_articulo = '"+linea_principal+"' " : "")+
      
              /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 05/07/2023-----------------------*/
              (ncp    > 0 ? "AND itm.custitem10           = '"+ncp+"' "   : "")+
              
                                (validador  ==1 ? "AND sbl.id IN("+sub_linea+") "   : "")+
"         GROUP BY "+
"             TransactionLine.Item, "+
"             itm.displayname, "+
"             itm.description "+
"     ) AS consulta2 "+
" ON consulta1.displayname = consulta2.displayname "+
"  LEFT JOIN "+
"     (         "+
"         SELECT "+
"             itm.displayname, "+
"             itm.description, "+
"             SUM(netamount*-1) Venta_total, "+
"             ROUND(SUM(TransactionLine.quantity*-1)) cantidad_de_venta_en_piezas, "+
"             ROUND(SUM(TransactionLine.quantity*-1)/"+Math.round(valor_dedia)+",2) Venta_Por_Dia, "+
"             (SELECT  ROUND(sum(quantityavailable)) FROM inventoryitemlocations WHERE inventoryitemlocations.Item = TransactionLine.Item AND location = 2) AS stock "+
"         FROM "+
"             TransactionLine "+
"             JOIN Transaction ON Transaction.id = TransactionLine.Transaction "+
"             JOIN item AS itm ON itm.ID = TransactionLine.Item "+
"             INNER JOIN location AS loc ON loc.id = TransactionLine.location "+
"     LEFT JOIN CUSTOMRECORD_BEX_SUBLINEA AS sbl ON sbl.id = itm.custitem_bex_sublinea "+   
"         WHERE "+
"             Transaction.type IN ('CustInvc', 'CustCred') "+
"             AND Transaction.tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
"             AND Transaction.tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
"             AND itm.description IS NOT NULL "+
"             AND itm.displayname != 'SAA' "+
"             AND itm.displayname != 'RM' "+
"             AND itm.itemtype = 'InvtPart' "+
"             AND itm.isinactive = 'F' "+
"             AND loc.id IN (2) "+
 (linea_principal.length   > 0 ? "AND itm.custitem_bex_tipo_articulo = '"+linea_principal+"' " : "")+
      
              /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 05/07/2023-----------------------*/
              (ncp    > 0 ? "AND itm.custitem10           = '"+ncp+"' "   : "")+
              
                                (validador  ==1 ? "AND sbl.id IN("+sub_linea+") "   : "")+
"         GROUP BY "+
"             TransactionLine.Item, "+
"             itm.displayname, "+
"             itm.description "+
"     ) AS consulta3 "+
" ON consulta1.displayname = consulta3.displayname "+
"  LEFT JOIN "+
"     (         "+
"         SELECT "+
"             itm.displayname, "+
"             itm.description, "+
"             SUM(netamount*-1) Venta_total, "+
"             ROUND(SUM(TransactionLine.quantity*-1)) cantidad_de_venta_en_piezas, "+
"             ROUND(SUM(TransactionLine.quantity*-1)/"+Math.round(valor_dedia)+",2) Venta_Por_Dia, "+
"             (SELECT  ROUND(sum(quantityavailable)) FROM inventoryitemlocations WHERE inventoryitemlocations.Item = TransactionLine.Item AND location = 4) AS stock "+
"         FROM "+
"             TransactionLine "+
"             JOIN Transaction ON Transaction.id = TransactionLine.Transaction "+
"             JOIN item AS itm ON itm.ID = TransactionLine.Item "+
"             INNER JOIN location AS loc ON loc.id = TransactionLine.location "+
"     LEFT JOIN CUSTOMRECORD_BEX_SUBLINEA AS sbl ON sbl.id = itm.custitem_bex_sublinea "+   
"         WHERE "+
"             Transaction.type IN ('CustInvc', 'CustCred') "+
"             AND Transaction.tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
"             AND Transaction.tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
"             AND itm.description IS NOT NULL "+
"             AND itm.displayname != 'SAA' "+
"             AND itm.displayname != 'RM' "+
"             AND itm.itemtype = 'InvtPart' "+
"             AND itm.isinactive = 'F' "+
"             AND loc.id IN (4) "+
 (linea_principal.length   > 0 ? "AND itm.custitem_bex_tipo_articulo = '"+linea_principal+"' " : "")+
      
              /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 05/07/2023-----------------------*/
              (ncp    > 0 ? "AND itm.custitem10           = '"+ncp+"' "   : "")+
              
                                (validador  ==1 ? "AND sbl.id IN("+sub_linea+") "   : "")+
"         GROUP BY "+
"             TransactionLine.Item, "+
"             itm.displayname, "+
"             itm.description "+
"     ) AS consulta4 "+
" ON consulta1.displayname = consulta4.displayname "+
" LEFT JOIN "+
"     (         "+
"         SELECT "+
"             itm.displayname, "+
"             itm.description, "+
"             SUM(netamount*-1) Venta_total, "+
"             ROUND(SUM(TransactionLine.quantity*-1)) cantidad_de_venta_en_piezas, "+
"             ROUND(SUM(TransactionLine.quantity*-1)/"+Math.round(valor_dedia)+",2) Venta_Por_Dia, "+
"             (SELECT  ROUND(sum(quantityavailable)) FROM inventoryitemlocations WHERE inventoryitemlocations.Item = TransactionLine.Item AND location = 5) AS stock "+
"         FROM "+
"             TransactionLine "+
"             JOIN Transaction ON Transaction.id = TransactionLine.Transaction "+
"             JOIN item AS itm ON itm.ID = TransactionLine.Item "+
"             INNER JOIN location AS loc ON loc.id = TransactionLine.location "+
"     LEFT JOIN CUSTOMRECORD_BEX_SUBLINEA AS sbl ON sbl.id = itm.custitem_bex_sublinea "+   
"         WHERE "+
"             Transaction.type IN ('CustInvc', 'CustCred') "+
"             AND Transaction.tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
"             AND Transaction.tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
"             AND itm.description IS NOT NULL "+
"             AND itm.displayname != 'SAA' "+
"             AND itm.displayname != 'RM' "+
"             AND itm.itemtype = 'InvtPart' "+
"             AND itm.isinactive = 'F' "+
"             AND loc.id IN (5) "+
 (linea_principal.length   > 0 ? "AND itm.custitem_bex_tipo_articulo = '"+linea_principal+"' " : "")+
      
              /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 05/07/2023-----------------------*/
              (ncp    > 0 ? "AND itm.custitem10           = '"+ncp+"' "   : "")+
              
                                (validador  ==1 ? "AND sbl.id IN("+sub_linea+") "   : "")+
"         GROUP BY "+
"             TransactionLine.Item, "+
"             itm.displayname, "+
"             itm.description "+
"     ) AS consulta5 "+
" ON consulta1.displayname = consulta5.displayname "+
" LEFT JOIN "+
"     (         "+
"         SELECT "+
"             itm.displayname, "+
"             itm.description, "+
"             SUM(netamount*-1) Venta_total, "+
"             ROUND(SUM(TransactionLine.quantity*-1)) cantidad_de_venta_en_piezas, "+
"             ROUND(SUM(TransactionLine.quantity*-1)/"+Math.round(valor_dedia)+",2) Venta_Por_Dia, "+
"             (SELECT  ROUND(sum(quantityavailable)) FROM inventoryitemlocations WHERE inventoryitemlocations.Item = TransactionLine.Item AND location = 1) AS stock "+
"         FROM "+
"             TransactionLine "+
"             JOIN Transaction ON Transaction.id = TransactionLine.Transaction "+
"             JOIN item AS itm ON itm.ID = TransactionLine.Item "+
"             INNER JOIN location AS loc ON loc.id = TransactionLine.location "+
"     LEFT JOIN CUSTOMRECORD_BEX_SUBLINEA AS sbl ON sbl.id = itm.custitem_bex_sublinea "+   
"         WHERE "+
"             Transaction.type IN ('CustInvc', 'CustCred') "+
"             AND Transaction.tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
"             AND Transaction.tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
"             AND itm.description IS NOT NULL "+
"             AND itm.displayname != 'SAA' "+
"             AND itm.displayname != 'RM' "+
"             AND itm.itemtype = 'InvtPart' "+
"             AND itm.isinactive = 'F' "+
"             AND loc.id IN (1) "+
 (linea_principal.length   > 0 ? "AND itm.custitem_bex_tipo_articulo = '"+linea_principal+"' " : "")+
      
              /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 05/07/2023-----------------------*/
              (ncp    > 0 ? "AND itm.custitem10           = '"+ncp+"' "   : "")+
              
                                (validador  ==1 ? "AND sbl.id IN("+sub_linea+") "   : "")+
"         GROUP BY "+
"             TransactionLine.Item, "+
"             itm.displayname, "+
"             itm.description "+
"     ) AS consulta6 "+
" ON consulta1.displayname = consulta6.displayname "+
" LEFT JOIN "+
"     (         "+
"         SELECT "+
"             itm.displayname, "+
"             itm.description, "+
"             SUM(netamount*-1) Venta_total, "+
"             ROUND(SUM(TransactionLine.quantity*-1)) cantidad_de_venta_en_piezas, "+
"             ROUND(SUM(TransactionLine.quantity*-1)/"+Math.round(valor_dedia)+",2) Venta_Por_Dia, "+
"             (SELECT  ROUND(sum(quantityavailable)) FROM inventoryitemlocations WHERE inventoryitemlocations.Item = TransactionLine.Item AND location = 3) AS stock "+
"         FROM "+
"             TransactionLine "+
"             JOIN Transaction ON Transaction.id = TransactionLine.Transaction "+
"             JOIN item AS itm ON itm.ID = TransactionLine.Item "+
"             INNER JOIN location AS loc ON loc.id = TransactionLine.location "+
"     LEFT JOIN CUSTOMRECORD_BEX_SUBLINEA AS sbl ON sbl.id = itm.custitem_bex_sublinea "+   
"         WHERE "+
"             Transaction.type IN ('CustInvc', 'CustCred') "+
"             AND Transaction.tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
"             AND Transaction.tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
"             AND itm.description IS NOT NULL "+
"             AND itm.displayname != 'SAA' "+
"             AND itm.displayname != 'RM' "+
"             AND itm.itemtype = 'InvtPart' "+
"             AND itm.isinactive = 'F' "+
"             AND loc.id IN (3) "+
 (linea_principal.length   > 0 ? "AND itm.custitem_bex_tipo_articulo = '"+linea_principal+"' " : "")+
      
              /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 05/07/2023-----------------------*/
              (ncp    > 0 ? "AND itm.custitem10           = '"+ncp+"' "   : "")+
              
                                (validador  ==1 ? "AND sbl.id IN("+sub_linea+") "   : "")+
"         GROUP BY "+
"             TransactionLine.Item, "+
"             itm.displayname, "+
"             itm.description "+
"     ) AS consulta7 "+
" ON consulta1.displayname = consulta7.displayname "+
/////////////////////////

" LEFT JOIN "+
"     (         "+
"         SELECT "+
"             itm.displayname, "+
"             itm.description, "+
"             SUM(netamount*-1) Venta_total, "+
"             ROUND(SUM(TransactionLine.quantity*-1)) cantidad_de_venta_en_piezas, "+
"             ROUND(SUM(TransactionLine.quantity*-1)/"+Math.round(valor_dedia)+",2) Venta_Por_Dia, "+
"             (SELECT  ROUND(sum(quantityavailable)) FROM inventoryitemlocations WHERE inventoryitemlocations.Item = TransactionLine.Item AND location = 23) AS stock "+
"         FROM "+
"             TransactionLine "+
"             JOIN Transaction ON Transaction.id = TransactionLine.Transaction "+
"             JOIN item AS itm ON itm.ID = TransactionLine.Item "+
"             INNER JOIN location AS loc ON loc.id = TransactionLine.location "+
"     LEFT JOIN CUSTOMRECORD_BEX_SUBLINEA AS sbl ON sbl.id = itm.custitem_bex_sublinea "+   
"         WHERE "+
"             Transaction.type IN ('CustInvc', 'CustCred') "+
"             AND Transaction.tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
"             AND Transaction.tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
"             AND itm.description IS NOT NULL "+
"             AND itm.displayname != 'SAA' "+
"             AND itm.displayname != 'RM' "+
"             AND itm.itemtype = 'InvtPart' "+
"             AND itm.isinactive = 'F' "+
"             AND loc.id IN (23) "+
 (linea_principal.length   > 0 ? "AND itm.custitem_bex_tipo_articulo = '"+linea_principal+"' " : "")+
      
              /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 05/07/2023-----------------------*/
              (ncp    > 0 ? "AND itm.custitem10           = '"+ncp+"' "   : "")+
              
                                (validador  ==1 ? "AND sbl.id IN("+sub_linea+") "   : "")+
"         GROUP BY "+
"             TransactionLine.Item, "+
"             itm.displayname, "+
"             itm.description "+
"     ) AS consulta8 "+
" ON consulta1.displayname = consulta8.displayname  "+wh//"  where consulta1.custitem15='"+marca1+"'"
//////////

;



      do {
        var suiteQL     = "SELECT * FROM ( SELECT ROWNUM AS ROWNUMBER, * FROM ("+ consultaSQL +" ) ) WHERE (ROWNUMBER BETWEEN " + noRowInicio + " AND " + noRowFinal + ")";
        var resultIterator  = query.runSuiteQL({ query: suiteQL }).asMappedResults();
        records       = records.concat( resultIterator );
        var moreRecords   = resultIterator.length < 5000 ? false : true;
        noRowInicio     = noRowInicio + 5000;
      } while (moreRecords);


    }
 




    var htmlField = form.addField({
      id: 'custpage_field_html',
      type: serverWidget.FieldType.INLINEHTML,
      label: 'HTML',
      container: 'grupotabla'
    });
 
    var dias1432 =Dias_diferencia(f_Inicio, f_Final);
            var dias143222 =contarDomingos(f_Inicio, f_Final);
      var ff111=Dias_diferencia(f_Inicio, f_Final);
          var valor_dedia=0
    if(dias1432==0){
      valor_dedia=1
    }else(
valor_dedia=(dias1432*2)-dias143222
      )
    var venta_total11=0;
    innerHtml = "";



   
  
        innerHtml+= '<br/><br/><input type="text" id="valor_Dias" name="Dias" class="form-control" value="'+Math.round(valor_dedia)+' Dias laborales de diferencia entre las fechas" readonly=""/>';
    innerHtml+= '<br/><input type="text" id="venta_total" name="venta_total" class="form-control" value="0 Gran total de venta" readonly=""/>';
        innerHtml+= '<br/><input type="text" id="Piezas_total" name="Piezas_total" class="form-control" value="'+marca1+'" Gran total de venta en piezas" readonly=""/>';
        innerHtml+= '<br/><br/> <button type="button" class="btn btn-info" id="botonImprimir">Imprimir</button>';
         innerHtml+= '<button  class="btn btn-info"  id="exportarExcel">Exportar a Excel</button>'
    innerHtml+= '<table style="table-layout: fixed; width: 300%; border-spacing: 6px;" >';
    innerHtml+= '<tr>';
    innerHtml+= '<td>';
    innerHtml+= '<div id="resultsDiv" style="display:none">';
    innerHtml+= ' <div class="row">';
    innerHtml+= ' <div class="col-md-9 col-lg-9 col-sm-9 col-xs-9">';
    
    innerHtml+= '   <table class="display nowrap table table-xs table-bordered table-hover table-responsive-xs miTabla" id="resultsTable" border="1">';
    if ( records.length > 0 ) {

      var columnNames = Object.keys( records[0] );
      innerHtml+= '     <thead class="thead-light">';

 innerHtml+= ' <tr>'
     innerHtml+= ' <th colspan="7" class="margen-rojo-th ">General</th>'
          innerHtml+= ' <th colspan="4" class="margen-rojo-th ">Fondeport</th>'
          innerHtml+= ' <th colspan="4" class="margen-rojo-th ">Cantamar</th>'
           innerHtml+= ' <th colspan="4" class="margen-rojo-th ">Melaque</th>'
             innerHtml+= ' <th colspan="4" class="margen-rojo-th "> La Huerta</th>'
               innerHtml+= ' <th colspan="4" class="margen-rojo-th ">Mayoreo</th>'
                innerHtml+= ' <th colspan="4" class="margen-rojo-th ">Villa</th>'
                     innerHtml+= ' <th colspan="4" class="margen-rojo-th ">Tlaquepaque</th>'
                     innerHtml+= ' <th colspan="4" class="margen-rojo-th ">Tlaquepaque</th>'

   innerHtml+= ' </tr>'
      innerHtml+= '       <tr class="ddda">';
      for ( i = 1; i < columnNames.length; i++ ) {
    


if (columnNames[i]=="vtas_tot_ctm"){
  innerHtml+= '     <th class="precio">vtas </th>';
}
else if (columnNames[i]=="cant_vtas_pz_ctm"){
  innerHtml+= '     <th class="miEncabezado">cant</th>';
}
else if (columnNames[i]=="vtas_x_dia_ctm"){
  innerHtml+= '     <th class="miEncabezado">vtas</th>';
}
else if (columnNames[i]=="stock_ctm"){
  innerHtml+= '     <th class="miEncabezado">stock</th>';
}
else if (columnNames[i]=="dias_invent_ctm"){  innerHtml+= '     <th class="miEncabezado">dias </th>';   }


else if (columnNames[i]=="vtas_tot_hta"){   innerHtml+= '     <th class="precio">vtas </th>';   }
else if (columnNames[i]=="cant_vtas_pz_hta"){    innerHtml+= '     <th class="miEncabezado">cant</th>';   }
else if (columnNames[i]=="vtas_x_dia_hta"){    innerHtml+= '     <th class="miEncabezado">vtas</th>';    }
else if (columnNames[i]=="stock_hta"){ innerHtml+= '     <th class="miEncabezado">stock</th>';   }
else if (columnNames[i]=="dias_invent_hta"){   innerHtml+= '     <th class="miEncabezado">dias </th>';   }    
else if (columnNames[i]=="vtas_tot_vla"){   innerHtml+= '     <th class="precio">vtas </th>';   }
else if (columnNames[i]=="cant_vtas_pz_vla"){    innerHtml+= '     <th class="miEncabezado">cant</th>';   }
else if (columnNames[i]=="vtas_x_dia_vla"){    innerHtml+= '     <th class="miEncabezado">vtas</th>';    }
else if (columnNames[i]=="stock_vla"){ innerHtml+= '     <th class="miEncabezado">stock</th>';   }
else if (columnNames[i]=="dias_invent_vla"){   innerHtml+= '     <th class="miEncabezado">dias </th>';   }    
  else if (columnNames[i]=="vtas_tot_FDP"){   innerHtml+= '     <th class="precio">vtas </th>';   }
else if (columnNames[i]=="cant_vtas_pz_fdp"){    innerHtml+= '     <th class="miEncabezado">cant</th>';   }
else if (columnNames[i]=="vtas_x_dia_fdp"){    innerHtml+= '     <th class="miEncabezado">vtas</th>';    }
else if (columnNames[i]=="stock_fdp"){ innerHtml+= '     <th class="miEncabezado">stock</th>';   }
else if (columnNames[i]=="dias_invent_fdp"){   innerHtml+= '     <th class="miEncabezado">dias </th>';   }    
else if (columnNames[i]=="vtas_tot_TLQ"){   innerHtml+= '     <th class="precio">vtas </th>';   }
else if (columnNames[i]=="cant_vtas_pz_tlq"){    innerHtml+= '     <th class="miEncabezado">cant</th>';   }
else if (columnNames[i]=="stock_tlq"){ innerHtml+= '     <th class="miEncabezado">stock</th>';   }
else if (columnNames[i]=="dias_invent_tlq"){   innerHtml+= '     <th class="miEncabezado">dias </th>';   }    
else if (columnNames[i]=="cant_vtas_pz_mlq"){    innerHtml+= '     <th class="miEncabezado">cant</th>';   }
else if (columnNames[i]=="vtas_x_dia_mlq"){    innerHtml+= '     <th class="miEncabezado">vtas</th>';    }
else if (columnNames[i]=="stock_mlq"){ innerHtml+= '     <th class="miEncabezado">stock</th>';   }
else if (columnNames[i]=="dias_invent_mlq"){   innerHtml+= '     <th class="miEncabezado">dias </th>';   }    
else if (columnNames[i]=="vtas_tot_may"){   innerHtml+= '     <th class="precio">vtas </th>';   }
else if (columnNames[i]=="cant_vtas_pz_may"){    innerHtml+= '     <th class="miEncabezado">cant</th>';   }
else if (columnNames[i]=="stock_may"){ innerHtml+= '     <th class="miEncabezado">stock</th>';   }
else if (columnNames[i]=="dias_invent_may"){   innerHtml+= '     <th class="miEncabezado">dias </th>';   }    
else if (columnNames[i]=="vtas_tot_fdp"){   innerHtml+= '    <th class="precio">vtas </th>';    }    
else if (columnNames[i]=="vtas_tot_fdp"){   innerHtml+= '    <th class="precio">vtas </th>';    }   
else if (columnNames[i]=="vtas_x_dia_tlq"){   innerHtml+= '     <th class="miEncabezado">vtas</th>';   }   
else if (columnNames[i]=="vtas_x_dia_may"){   innerHtml+= '     <th class="miEncabezado">vtas</th>';   } 
else if (columnNames[i]=="dias_invent"){   innerHtml+= '     <th class="miEncabezado">Dias</th>';   } 
else{

        innerHtml+= '     <th class="miEncabezado">'+columnNames[i]+'</th>';
}

}

      innerHtml+= '       </tr>';
            innerHtml+= '       <tr class="ddda">';
      for ( i = 1; i < columnNames.length; i++ ) {
    


if (columnNames[i]=="vtas_tot_ctm"){
  innerHtml+= '     <th class="precio">tot</th>';
}
else if (columnNames[i]=="cant_vtas_pz_ctm"){
  innerHtml+= '     <th class="miEncabezado"> pz</th>';
}
else if (columnNames[i]=="vtas_x_dia_ctm"){
  innerHtml+= '     <th class="miEncabezado">x dia</th>';
}
else if (columnNames[i]=="stock_ctm"){
  innerHtml+= '     <th class="miEncabezado"></th>';
}
else if (columnNames[i]=="dias_invent_ctm"){  innerHtml+= '     <th class="miEncabezado">inv</th>';   }


else if (columnNames[i]=="vtas_tot_hta"){   innerHtml+= '     <th class="precio">tot</th>';   }
else if (columnNames[i]=="cant_vtas_pz_hta"){    innerHtml+= '     <th class="miEncabezado"> pz</th>';   }
else if (columnNames[i]=="vtas_x_dia_hta"){    innerHtml+= '     <th class="miEncabezado">x dia</th>';    }
else if (columnNames[i]=="stock_hta"){ innerHtml+= '     <th class="miEncabezado"></th>';   }
else if (columnNames[i]=="dias_invent_hta"){   innerHtml+= '     <th class="miEncabezado">inv</th>';   }    
else if (columnNames[i]=="vtas_tot_vla"){   innerHtml+= '     <th class="precio">tot</th>';   }
else if (columnNames[i]=="cant_vtas_pz_vla"){    innerHtml+= '     <th class="miEncabezado"> pz</th>';   }
else if (columnNames[i]=="vtas_x_dia_vla"){    innerHtml+= '     <th class="miEncabezado">x dia</th>';    }
else if (columnNames[i]=="stock_vla"){ innerHtml+= '     <th class="miEncabezado"></th>';   }
else if (columnNames[i]=="dias_invent_vla"){   innerHtml+= '     <th class="miEncabezado">inv</th>';   }    
  else if (columnNames[i]=="vtas_tot_FDP"){   innerHtml+= '     <th class="precio">tot</th>';   }
else if (columnNames[i]=="cant_vtas_pz_fdp"){    innerHtml+= '     <th class="miEncabezado"> pz</th>';   }
else if (columnNames[i]=="vtas_x_dia_fdp"){    innerHtml+= '     <th class="miEncabezado">x dia</th>';    }
else if (columnNames[i]=="stock_fdp"){ innerHtml+= '     <th class="miEncabezado"></th>';   }
else if (columnNames[i]=="dias_invent_fdp"){   innerHtml+= '     <th class="miEncabezado">inv</th>';   }    
else if (columnNames[i]=="vtas_tot_TLQ"){   innerHtml+= '     <th class="precio">tot</th>';   }
else if (columnNames[i]=="cant_vtas_pz_tlq"){    innerHtml+= '     <th class="miEncabezado"> pz</th>';   }
else if (columnNames[i]=="stock_tlq"){ innerHtml+= '     <th class="miEncabezado"></th>';   }
else if (columnNames[i]=="dias_invent_tlq"){   innerHtml+= '     <th class="miEncabezado">inv</th>';   }    
else if (columnNames[i]=="cant_vtas_pz_mlq"){    innerHtml+= '     <th class="miEncabezado"> pz</th>';   }
else if (columnNames[i]=="vtas_x_dia_mlq"){    innerHtml+= '     <th class="miEncabezado">x dia</th>';    }
else if (columnNames[i]=="stock_mlq"){ innerHtml+= '     <th class="miEncabezado"></th>';   }
else if (columnNames[i]=="dias_invent_mlq"){   innerHtml+= '     <th class="miEncabezado">inv</th>';   }    
else if (columnNames[i]=="vtas_tot_may"){   innerHtml+= '     <th class="precio">tot</th>';   }
else if (columnNames[i]=="cant_vtas_pz_may"){    innerHtml+= '     <th class="miEncabezado"> pz</th>';   }
else if (columnNames[i]=="stock_may"){ innerHtml+= '     <th class="miEncabezado"></th>';   }
else if (columnNames[i]=="dias_invent_may"){   innerHtml+= '     <th class="miEncabezado">inv</th>';   }    
else if (columnNames[i]=="vtas_tot_fdp"){   innerHtml+= '    <th class="precio">tot</th>';    }    
else if (columnNames[i]=="vtas_tot_fdp"){   innerHtml+= '    <th class="precio">tot</th>';    }   
else if (columnNames[i]=="vtas_x_dia_tlq"){   innerHtml+= '     <th class="miEncabezado">x dia</th>';   }   
else if (columnNames[i]=="vtas_x_dia_may"){   innerHtml+= '     <th class="miEncabezado">x dia</th>';   } 



else if (columnNames[i]=="codigo"){   innerHtml+= '     <th class="miEncabezado"></th>';   }   
else if (columnNames[i]=="nombre"){   innerHtml+= '     <th class="miEncabezado"></th>';   } 
else if (columnNames[i]=="vtas_tot"){   innerHtml+= '     <th class="miEncabezado"></th>';   }   
else if (columnNames[i]=="cant_vtas_pz"){   innerHtml+= '     <th class="miEncabezado"></th>';   } 
else if (columnNames[i]=="vtas_x_dia"){   innerHtml+= '     <th class="miEncabezado"></th>';   }   
else if (columnNames[i]=="stock"){   innerHtml+= '     <th class="miEncabezado"></th>';   } 
else if (columnNames[i]=="dias_invent"){   innerHtml+= '     <th class="miEncabezado">inv</th>';   } 

else{

        innerHtml+= '     <th class="miEncabezado">'+columnNames[i]+'</th>';
}

}

      innerHtml+= '       </tr>';
      innerHtml+= '     </thead>';
      innerHtml+= '     <tbody >';
      // Add the records to the sublist...
      for ( r = 0; r < records.length; r++ ) {
        
          var venta_diaria_ct     = 0;
        var meses_inv     = 0;
        var venta_prom_diaria = 0;
        var venta_prom_mensual  = 0;
        var ventas_pza_anual  = 0;
        var cobertura     = 0;
        var disponible      = 0;
          var venta_de_dia = 0;
        var pendiente_x_recibir = 0;
        var venta_1_mes_atras = 0;
        var venta_1_mes_futuro  = 0;
        var dif_dias_fechas   = 0;
        var contador_domingos = 0;
        var dias_x_transcurrir  = 0;
        var venta_dias_x_transc = 0;
        var proyectado      = 0;
        var sugerido_compra   = 0;
        var comprar       = 0;
      var stock = 0;
        var venta_stock=0;
          var venta_stock_br=0;
              var cantidad_venta_piezas=0;
          var Vposible=0;
        var bComprar;
        var fecha_inicio_mes_f;
        var fecha_final_mes_f;
        var comprador;
        var es_numero     = false;
          var clasificacion       = 0;
var tipoCompra  = 0;  var comp =0;
        innerHtml+= '     <tr>';
        var record = records[r];
        for ( c = 1; c < columnNames.length; c++ ) {
          // Nombre de la columna
          var column = columnNames[c];
          var value = record[column];


            if (column.indexOf("punto_de_pedido") !== -1)continue;

 if (column.indexOf("Codigo_Cantamar") !== -1)continue;
  if (column.indexOf("Codigo_La_huerta") !== -1)continue;
   if (column.indexOf("Codigo_Villa_Purificacion") !== -1)continue;
    if (column.indexOf("Codigo_Fondeport") !== -1)continue;
     if (column.indexOf("Codigo_Monterrey") !== -1)continue;
      if (column.indexOf("Codigo_Tlaquepaque") !== -1)continue;
       if (column.indexOf("Codigo_Melaque") !== -1)continue;
        if (column.indexOf("Codigo_Autlan") !== -1)continue;


                     
                      if (column.indexOf("stock_optimo") !== -1)continue;
                      if (column.indexOf("sugerido_compra") !== -1)continue;

          if (column.indexOf("meses_c_inventario") !== -1)
            meses_inv += parseInt(value);
          else if (column.indexOf("venta_1_mes_atras") !== -1)
            venta_1_mes_atras += parseFloat(value);
      
        else if (column.indexOf("clasificacion") !== -1) 
  
          clasificacion = value.toString();
        if (column.indexOf("clasificacion") !== -1)continue;
      
            else if (column.indexOf("venta_1_mes_atras") !== -1)
                  venta_stock += parseFloat(value);
          else if (column.indexOf("venta_1_mes_futuro") !== -1)
            venta_1_mes_futuro += parseFloat(value);
          else if (column.indexOf("fecha_inicio_mes_f") !== -1)
            fecha_inicio_mes_f = value.toString();
          else if (column.indexOf("fecha_final_mes_f") !== -1)
            fecha_final_mes_f = value.toString();
          else if (column.indexOf("dif_dias_fechas") !== -1)
            dif_dias_fechas = parseFloat(value);
       
            else if (column.indexOf("vtas_tot") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';

        else if (column.indexOf("Vtas_tot_cantamar") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
                else if (column.indexOf("Vtas_tot_La_Huerta") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
                else if (column.indexOf("Vtas_tot_Villa_Purificacion") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
                else if (column.indexOf("Vtas_tot_Fondeport") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
                else if (column.indexOf("Vtas_tot_Tlaquepaque") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
                else if (column.indexOf("Vtas_tot_Melaque") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';


  else if (column.indexOf("cantidad_de_venta_en_piezas") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';


 else if (column.indexOf("Vtas_x_Dia_cantamar") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("stock_cantamar") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("Vtas_x_Dia_la_huerta") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("stock_la_huerta") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("Vtas_x_Dia_villa_purificacion") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("stock_villa_purificacion") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("Vtas_x_Dia_fondeport") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("stock_fondeport") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("Vtas_x_Dia_tlaquepaque") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("stock_tlaquepaque") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("Vtas_x_Dia_melaque") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("stock_melaque") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
         else if (column.indexOf("cantidad_venta_piezas") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" class="c_piezas">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
         else if (column.indexOf("stock") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" class="c_piezas">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
           else if (column.indexOf("total_venta_cantamar") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" class="tot_canta">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
        else if (column.indexOf("Stock") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" class="hide">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
                else if (column.indexOf("stock") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseFloat(value).toFixed(0) : value) + '</td>';
            else if (column.indexOf("cantidad_venta_piezas") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseFloat(value).toFixed(0) : value) + '</td>';


else if (column.indexOf("cant_vtas_pz_ctm") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_ctm") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_ctm") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("cant_vtas_pz_hta") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_hta") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_hta") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("cant_vtas_pz_vla") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_vla") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_vla") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("cant_vtas_pz_fdp") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_fdp") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_fdp") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("cant_vtas_pz_tlq") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_tlq") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_tlq") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("cant_vtas_pz_mlq") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_mlq") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_mlq") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("cant_vtas_pz_may") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_may") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_may") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';

           else if (column.indexOf("Venta_Por_Dia") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
           else if (column.indexOf("dias_invent_") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" class="c_inventario">' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';

          else{
            value = value === null ? '&nbsp;' : value.toString();
            if ( value.length > 300 ) {
              value = value.substring( 0, 297 ) + '...';
            }
            es_numero = c >= 8 && !isNaN(value) ? true : false;
            innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
          }
          if (column.indexOf("cantidad_venta_piezas") !== -1)

            cantidad_venta_piezas = parseFloat(value);

          if (column.indexOf("stock") !== -1)
            stock = parseFloat(value);
          if (column.indexOf("venta_de_dia") !== -1)
            venta_de_dia = parseFloat(value);
          if (column.indexOf("pendiente_x_recibir") !== -1)
            pendiente_x_recibir = parseFloat(value);
          if (column.indexOf("sugerido_compra") !== -1)
            sugerido_compra = parseFloat(value);
          if (column.indexOf("comprador") !== -1)
            comprador = value.toString();
      
        }




      
        venta_totaldisponible=stock
        cobertura     = (disponible + 0) ;


        dias_x_transcurrir  = dif_dias_fechas - contador_domingos;
    
        proyectado      = Math.max(venta_prom_mensual, sugerido_compra, venta_1_mes_atras, venta_1_mes_futuro);
        proyectado      = comprador == 'Comprador 1' || comprador == 'Comprador 2' ? venta_prom_mensual : proyectado;
        comprar       = proyectado - disponible - pendiente_x_recibir;
        bComprar      = comprar > 0 ? "SI" : "";

       venta_diaria=cantidad_venta_piezas/dias2222
       Venta_con_stock_actual=0
        Venta_con_stock_actual=cobertura/venta_diaria

        if(cantidad_venta_piezas >0  )
          {Venta_con_stock_actual=cobertura/venta_diaria}
          else{  Venta_con_stock_actual=0}
        
              if(comprar   >0  ){
                comp=comprar
              }else{  comp=0}

    
                                                             
            


      

        innerHtml+= '     </tr>';
      }
      innerHtml+= '     </tbody>';
    }else {
      innerHtml+= '     <thead class="thead-light">';
      innerHtml+= '       <tr>';
      innerHtml+= '         <th></th>';
      innerHtml+= '         <th></th>';
      innerHtml+= '         <th></th>';
      innerHtml+= '         <th></th>';
      innerHtml+= '         <th></th>';
      innerHtml+= '       </tr>';
      innerHtml+= '     </thead>';
      innerHtml+= '     <tbody>';
      innerHtml+= '     </tbody>';
    }
    innerHtml+= '   </table>';

    //////////////tabla2
    innerHtml+= '   <table class="table hide" id="resultsTable2" border="1">';
    if ( records.length > 0 ) {

      var columnNames = Object.keys( records[0] );
      innerHtml+= '     <thead class="thead-light">';

 innerHtml+= ' <tr>'
     innerHtml+= ' <th colspan="7" class="margen-rojo-th ">General</th>'
          innerHtml+= ' <th colspan="4" class="margen-rojo-th ">Fondeport</th>'
          innerHtml+= ' <th colspan="4" class="margen-rojo-th ">Cantamar</th>'
           innerHtml+= ' <th colspan="4" class="margen-rojo-th ">Melaque</th>'
             innerHtml+= ' <th colspan="4" class="margen-rojo-th "> La Huerta</th>'
               innerHtml+= ' <th colspan="4" class="margen-rojo-th ">Mayoreo</th>'
                innerHtml+= ' <th colspan="4" class="margen-rojo-th ">Villa</th>'
                     innerHtml+= ' <th colspan="4" class="margen-rojo-th ">Tlaquepaque</th>'
                     innerHtml+= ' <th colspan="4" class="margen-rojo-th ">Tlaquepaque</th>'

   innerHtml+= ' </tr>'
      innerHtml+= '       <tr class="ddda">';
      for ( i = 1; i < columnNames.length; i++ ) {
    


if (columnNames[i]=="vtas_tot_ctm"){
  innerHtml+= '     <th class="precio">vtas </th>';
}
else if (columnNames[i]=="cant_vtas_pz_ctm"){
  innerHtml+= '     <th class="miEncabezado">cant</th>';
}
else if (columnNames[i]=="vtas_x_dia_ctm"){
  innerHtml+= '     <th class="miEncabezado">vtas</th>';
}
else if (columnNames[i]=="stock_ctm"){
  innerHtml+= '     <th class="miEncabezado">stock</th>';
}
else if (columnNames[i]=="dias_invent_ctm"){  innerHtml+= '     <th class="miEncabezado">dias </th>';   }


else if (columnNames[i]=="vtas_tot_hta"){   innerHtml+= '     <th class="precio">vtas </th>';   }
else if (columnNames[i]=="cant_vtas_pz_hta"){    innerHtml+= '     <th class="miEncabezado">cant</th>';   }
else if (columnNames[i]=="vtas_x_dia_hta"){    innerHtml+= '     <th class="miEncabezado">vtas</th>';    }
else if (columnNames[i]=="stock_hta"){ innerHtml+= '     <th class="miEncabezado">stock</th>';   }
else if (columnNames[i]=="dias_invent_hta"){   innerHtml+= '     <th class="miEncabezado">dias </th>';   }    
else if (columnNames[i]=="vtas_tot_vla"){   innerHtml+= '     <th class="precio">vtas </th>';   }
else if (columnNames[i]=="cant_vtas_pz_vla"){    innerHtml+= '     <th class="miEncabezado">cant</th>';   }
else if (columnNames[i]=="vtas_x_dia_vla"){    innerHtml+= '     <th class="miEncabezado">vtas</th>';    }
else if (columnNames[i]=="stock_vla"){ innerHtml+= '     <th class="miEncabezado">stock</th>';   }
else if (columnNames[i]=="dias_invent_vla"){   innerHtml+= '     <th class="miEncabezado">dias </th>';   }    
  else if (columnNames[i]=="vtas_tot_FDP"){   innerHtml+= '     <th class="precio">vtas </th>';   }
else if (columnNames[i]=="cant_vtas_pz_fdp"){    innerHtml+= '     <th class="miEncabezado">cant</th>';   }
else if (columnNames[i]=="vtas_x_dia_fdp"){    innerHtml+= '     <th class="miEncabezado">vtas</th>';    }
else if (columnNames[i]=="stock_fdp"){ innerHtml+= '     <th class="miEncabezado">stock</th>';   }
else if (columnNames[i]=="dias_invent_fdp"){   innerHtml+= '     <th class="miEncabezado">dias </th>';   }    
else if (columnNames[i]=="vtas_tot_TLQ"){   innerHtml+= '     <th class="precio">vtas </th>';   }
else if (columnNames[i]=="cant_vtas_pz_tlq"){    innerHtml+= '     <th class="miEncabezado">cant</th>';   }
else if (columnNames[i]=="stock_tlq"){ innerHtml+= '     <th class="miEncabezado">stock</th>';   }
else if (columnNames[i]=="dias_invent_tlq"){   innerHtml+= '     <th class="miEncabezado">dias </th>';   }    
else if (columnNames[i]=="cant_vtas_pz_mlq"){    innerHtml+= '     <th class="miEncabezado">cant</th>';   }
else if (columnNames[i]=="vtas_x_dia_mlq"){    innerHtml+= '     <th class="miEncabezado">vtas</th>';    }
else if (columnNames[i]=="stock_mlq"){ innerHtml+= '     <th class="miEncabezado">stock</th>';   }
else if (columnNames[i]=="dias_invent_mlq"){   innerHtml+= '     <th class="miEncabezado">dias </th>';   }    
else if (columnNames[i]=="vtas_tot_may"){   innerHtml+= '     <th class="precio">vtas </th>';   }
else if (columnNames[i]=="cant_vtas_pz_may"){    innerHtml+= '     <th class="miEncabezado">cant</th>';   }
else if (columnNames[i]=="stock_may"){ innerHtml+= '     <th class="miEncabezado">stock</th>';   }
else if (columnNames[i]=="dias_invent_may"){   innerHtml+= '     <th class="miEncabezado">dias </th>';   }    
else if (columnNames[i]=="vtas_tot_fdp"){   innerHtml+= '    <th class="precio">vtas </th>';    }    
else if (columnNames[i]=="vtas_tot_fdp"){   innerHtml+= '    <th class="precio">vtas </th>';    }   
else if (columnNames[i]=="vtas_x_dia_tlq"){   innerHtml+= '     <th class="miEncabezado">vtas</th>';   }   
else if (columnNames[i]=="vtas_x_dia_may"){   innerHtml+= '     <th class="miEncabezado">vtas</th>';   } 
else if (columnNames[i]=="dias_invent"){   innerHtml+= '     <th class="miEncabezado">Dias</th>';   } 
else{

        innerHtml+= '     <th class="miEncabezado">'+columnNames[i]+'</th>';
}

}

      innerHtml+= '       </tr>';
            innerHtml+= '       <tr class="ddda">';
      for ( i = 1; i < columnNames.length; i++ ) {
    


if (columnNames[i]=="vtas_tot_ctm"){
  innerHtml+= '     <th class="precio">tot</th>';
}
else if (columnNames[i]=="cant_vtas_pz_ctm"){
  innerHtml+= '     <th class="miEncabezado"> pz</th>';
}
else if (columnNames[i]=="vtas_x_dia_ctm"){
  innerHtml+= '     <th class="miEncabezado">x dia</th>';
}
else if (columnNames[i]=="stock_ctm"){
  innerHtml+= '     <th class="miEncabezado"></th>';
}
else if (columnNames[i]=="dias_invent_ctm"){  innerHtml+= '     <th class="miEncabezado">inv</th>';   }


else if (columnNames[i]=="vtas_tot_hta"){   innerHtml+= '     <th class="precio">tot</th>';   }
else if (columnNames[i]=="cant_vtas_pz_hta"){    innerHtml+= '     <th class="miEncabezado"> pz</th>';   }
else if (columnNames[i]=="vtas_x_dia_hta"){    innerHtml+= '     <th class="miEncabezado">x dia</th>';    }
else if (columnNames[i]=="stock_hta"){ innerHtml+= '     <th class="miEncabezado"></th>';   }
else if (columnNames[i]=="dias_invent_hta"){   innerHtml+= '     <th class="miEncabezado">inv</th>';   }    
else if (columnNames[i]=="vtas_tot_vla"){   innerHtml+= '     <th class="precio">tot</th>';   }
else if (columnNames[i]=="cant_vtas_pz_vla"){    innerHtml+= '     <th class="miEncabezado"> pz</th>';   }
else if (columnNames[i]=="vtas_x_dia_vla"){    innerHtml+= '     <th class="miEncabezado">x dia</th>';    }
else if (columnNames[i]=="stock_vla"){ innerHtml+= '     <th class="miEncabezado"></th>';   }
else if (columnNames[i]=="dias_invent_vla"){   innerHtml+= '     <th class="miEncabezado">inv</th>';   }    
  else if (columnNames[i]=="vtas_tot_FDP"){   innerHtml+= '     <th class="precio">tot</th>';   }
else if (columnNames[i]=="cant_vtas_pz_fdp"){    innerHtml+= '     <th class="miEncabezado"> pz</th>';   }
else if (columnNames[i]=="vtas_x_dia_fdp"){    innerHtml+= '     <th class="miEncabezado">x dia</th>';    }
else if (columnNames[i]=="stock_fdp"){ innerHtml+= '     <th class="miEncabezado"></th>';   }
else if (columnNames[i]=="dias_invent_fdp"){   innerHtml+= '     <th class="miEncabezado">inv</th>';   }    
else if (columnNames[i]=="vtas_tot_TLQ"){   innerHtml+= '     <th class="precio">tot</th>';   }
else if (columnNames[i]=="cant_vtas_pz_tlq"){    innerHtml+= '     <th class="miEncabezado"> pz</th>';   }
else if (columnNames[i]=="stock_tlq"){ innerHtml+= '     <th class="miEncabezado"></th>';   }
else if (columnNames[i]=="dias_invent_tlq"){   innerHtml+= '     <th class="miEncabezado">inv</th>';   }    
else if (columnNames[i]=="cant_vtas_pz_mlq"){    innerHtml+= '     <th class="miEncabezado"> pz</th>';   }
else if (columnNames[i]=="vtas_x_dia_mlq"){    innerHtml+= '     <th class="miEncabezado">x dia</th>';    }
else if (columnNames[i]=="stock_mlq"){ innerHtml+= '     <th class="miEncabezado"></th>';   }
else if (columnNames[i]=="dias_invent_mlq"){   innerHtml+= '     <th class="miEncabezado">inv</th>';   }    
else if (columnNames[i]=="vtas_tot_may"){   innerHtml+= '     <th class="precio">tot</th>';   }
else if (columnNames[i]=="cant_vtas_pz_may"){    innerHtml+= '     <th class="miEncabezado"> pz</th>';   }
else if (columnNames[i]=="stock_may"){ innerHtml+= '     <th class="miEncabezado"></th>';   }
else if (columnNames[i]=="dias_invent_may"){   innerHtml+= '     <th class="miEncabezado">inv</th>';   }    
else if (columnNames[i]=="vtas_tot_fdp"){   innerHtml+= '    <th class="precio">tot</th>';    }    
else if (columnNames[i]=="vtas_tot_fdp"){   innerHtml+= '    <th class="precio">tot</th>';    }   
else if (columnNames[i]=="vtas_x_dia_tlq"){   innerHtml+= '     <th class="miEncabezado">x dia</th>';   }   
else if (columnNames[i]=="vtas_x_dia_may"){   innerHtml+= '     <th class="miEncabezado">x dia</th>';   } 



else if (columnNames[i]=="codigo"){   innerHtml+= '     <th class="miEncabezado"></th>';   }   
else if (columnNames[i]=="nombre"){   innerHtml+= '     <th class="miEncabezado"></th>';   } 
else if (columnNames[i]=="vtas_tot"){   innerHtml+= '     <th class="miEncabezado"></th>';   }   
else if (columnNames[i]=="cant_vtas_pz"){   innerHtml+= '     <th class="miEncabezado"></th>';   } 
else if (columnNames[i]=="vtas_x_dia"){   innerHtml+= '     <th class="miEncabezado"></th>';   }   
else if (columnNames[i]=="stock"){   innerHtml+= '     <th class="miEncabezado"></th>';   } 
else if (columnNames[i]=="dias_invent"){   innerHtml+= '     <th class="miEncabezado">inv</th>';   } 

else{

        innerHtml+= '     <th class="miEncabezado">'+columnNames[i]+'</th>';
}

}

      innerHtml+= '       </tr>';
      innerHtml+= '     </thead>';
      innerHtml+= '     <tbody >';
      // Add the records to the sublist...
      for ( r = 0; r < records.length; r++ ) {
        
          var venta_diaria_ct     = 0;
        var meses_inv     = 0;
        var venta_prom_diaria = 0;
        var venta_prom_mensual  = 0;
        var ventas_pza_anual  = 0;
        var cobertura     = 0;
        var disponible      = 0;
          var venta_de_dia = 0;
        var pendiente_x_recibir = 0;
        var venta_1_mes_atras = 0;
        var venta_1_mes_futuro  = 0;
        var dif_dias_fechas   = 0;
        var contador_domingos = 0;
        var dias_x_transcurrir  = 0;
        var venta_dias_x_transc = 0;
        var proyectado      = 0;
        var sugerido_compra   = 0;
        var comprar       = 0;
      var stock = 0;
        var venta_stock=0;
          var venta_stock_br=0;
              var cantidad_venta_piezas=0;
          var Vposible=0;
        var bComprar;
        var fecha_inicio_mes_f;
        var fecha_final_mes_f;
        var comprador;
        var es_numero     = false;
          var clasificacion       = 0;
var tipoCompra  = 0;  var comp =0;
        innerHtml+= '     <tr>';
        var record = records[r];
        for ( c = 1; c < columnNames.length; c++ ) {
          // Nombre de la columna
          var column = columnNames[c];
          var value = record[column];


            if (column.indexOf("punto_de_pedido") !== -1)continue;

 if (column.indexOf("Codigo_Cantamar") !== -1)continue;
  if (column.indexOf("Codigo_La_huerta") !== -1)continue;
   if (column.indexOf("Codigo_Villa_Purificacion") !== -1)continue;
    if (column.indexOf("Codigo_Fondeport") !== -1)continue;
     if (column.indexOf("Codigo_Monterrey") !== -1)continue;
      if (column.indexOf("Codigo_Tlaquepaque") !== -1)continue;
       if (column.indexOf("Codigo_Melaque") !== -1)continue;
        if (column.indexOf("Codigo_Autlan") !== -1)continue;


                     
                      if (column.indexOf("stock_optimo") !== -1)continue;
                      if (column.indexOf("sugerido_compra") !== -1)continue;

          if (column.indexOf("meses_c_inventario") !== -1)
            meses_inv += parseInt(value);
          else if (column.indexOf("venta_1_mes_atras") !== -1)
            venta_1_mes_atras += parseFloat(value);
      
        else if (column.indexOf("clasificacion") !== -1) 
  
          clasificacion = value.toString();
        if (column.indexOf("clasificacion") !== -1)continue;
      
            else if (column.indexOf("venta_1_mes_atras") !== -1)
                  venta_stock += parseFloat(value);
          else if (column.indexOf("venta_1_mes_futuro") !== -1)
            venta_1_mes_futuro += parseFloat(value);
          else if (column.indexOf("fecha_inicio_mes_f") !== -1)
            fecha_inicio_mes_f = value.toString();
          else if (column.indexOf("fecha_final_mes_f") !== -1)
            fecha_final_mes_f = value.toString();
          else if (column.indexOf("dif_dias_fechas") !== -1)
            dif_dias_fechas = parseFloat(value);
       
            else if (column.indexOf("vtas_tot") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';

        else if (column.indexOf("Vtas_tot_cantamar") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
                else if (column.indexOf("Vtas_tot_La_Huerta") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
                else if (column.indexOf("Vtas_tot_Villa_Purificacion") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
                else if (column.indexOf("Vtas_tot_Fondeport") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
                else if (column.indexOf("Vtas_tot_Tlaquepaque") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
                else if (column.indexOf("Vtas_tot_Melaque") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';


  else if (column.indexOf("cantidad_de_venta_en_piezas") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';


 else if (column.indexOf("Vtas_x_Dia_cantamar") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("stock_cantamar") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("Vtas_x_Dia_la_huerta") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("stock_la_huerta") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("Vtas_x_Dia_villa_purificacion") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("stock_villa_purificacion") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("Vtas_x_Dia_fondeport") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("stock_fondeport") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("Vtas_x_Dia_tlaquepaque") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("stock_tlaquepaque") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("Vtas_x_Dia_melaque") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("stock_melaque") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
         else if (column.indexOf("cantidad_venta_piezas") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" class="c_piezas">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
         else if (column.indexOf("stock") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" class="c_piezas">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
           else if (column.indexOf("total_venta_cantamar") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" class="tot_canta">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
        else if (column.indexOf("Stock") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" class="hide">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
                else if (column.indexOf("stock") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseFloat(value).toFixed(0) : value) + '</td>';
            else if (column.indexOf("cantidad_venta_piezas") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseFloat(value).toFixed(0) : value) + '</td>';


else if (column.indexOf("cant_vtas_pz_ctm") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_ctm") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_ctm") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("cant_vtas_pz_hta") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_hta") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_hta") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("cant_vtas_pz_vla") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_vla") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_vla") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("cant_vtas_pz_fdp") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_fdp") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_fdp") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("cant_vtas_pz_tlq") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_tlq") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_tlq") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("cant_vtas_pz_mlq") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_mlq") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_mlq") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("cant_vtas_pz_may") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_may") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_may") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';

           else if (column.indexOf("Venta_Por_Dia") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
           else if (column.indexOf("dias_invent_") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" class="c_inventario">' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';

          else{
            value = value === null ? '&nbsp;' : value.toString();
            if ( value.length > 300 ) {
              value = value.substring( 0, 297 ) + '...';
            }
            es_numero = c >= 8 && !isNaN(value) ? true : false;
            innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
          }
          if (column.indexOf("cantidad_venta_piezas") !== -1)

            cantidad_venta_piezas = parseFloat(value);

          if (column.indexOf("stock") !== -1)
            stock = parseFloat(value);
          if (column.indexOf("venta_de_dia") !== -1)
            venta_de_dia = parseFloat(value);
          if (column.indexOf("pendiente_x_recibir") !== -1)
            pendiente_x_recibir = parseFloat(value);
          if (column.indexOf("sugerido_compra") !== -1)
            sugerido_compra = parseFloat(value);
          if (column.indexOf("comprador") !== -1)
            comprador = value.toString();
      
        }




      
        venta_totaldisponible=stock
        cobertura     = (disponible + 0) ;


        dias_x_transcurrir  = dif_dias_fechas - contador_domingos;
    
        proyectado      = Math.max(venta_prom_mensual, sugerido_compra, venta_1_mes_atras, venta_1_mes_futuro);
        proyectado      = comprador == 'Comprador 1' || comprador == 'Comprador 2' ? venta_prom_mensual : proyectado;
        comprar       = proyectado - disponible - pendiente_x_recibir;
        bComprar      = comprar > 0 ? "SI" : "";

       venta_diaria=cantidad_venta_piezas/dias2222
       Venta_con_stock_actual=0
        Venta_con_stock_actual=cobertura/venta_diaria

        if(cantidad_venta_piezas >0  )
          {Venta_con_stock_actual=cobertura/venta_diaria}
          else{  Venta_con_stock_actual=0}
        
              if(comprar   >0  ){
                comp=comprar
              }else{  comp=0}

    
                                                             
            


      

        innerHtml+= '     </tr>';
      }
      innerHtml+= '     </tbody>';
    }else {
      innerHtml+= '     <thead class="thead-light">';
      innerHtml+= '       <tr>';
      innerHtml+= '         <th></th>';
      innerHtml+= '         <th></th>';
      innerHtml+= '         <th></th>';
      innerHtml+= '         <th></th>';
      innerHtml+= '         <th></th>';
      innerHtml+= '       </tr>';
      innerHtml+= '     </thead>';
      innerHtml+= '     <tbody>';
      innerHtml+= '     </tbody>';
    }
    innerHtml+= '   </table>';

    //////////tabla2
    ////////////tabla 3
   innerHtml+= '   <table class="table hide" id="resultsTable3" border="1">';
    if ( records.length > 0 ) {

      var columnNames = Object.keys( records[0] );
      innerHtml+= '     <thead class="thead-light">';

      innerHtml+= '       <tr class="ddda">';
      for ( i = 1; i < columnNames.length; i++ ) {
    





        innerHtml+= '     <th class="miEncabezado">'+columnNames[i]+'</th>';


}

      innerHtml+= '       </tr>';

      innerHtml+= '     </thead>';
      innerHtml+= '     <tbody >';
      // Add the records to the sublist...
      for ( r = 0; r < records.length; r++ ) {
        
          var venta_diaria_ct     = 0;
        var meses_inv     = 0;
        var venta_prom_diaria = 0;
        var venta_prom_mensual  = 0;
        var ventas_pza_anual  = 0;
        var cobertura     = 0;
        var disponible      = 0;
          var venta_de_dia = 0;
        var pendiente_x_recibir = 0;
        var venta_1_mes_atras = 0;
        var venta_1_mes_futuro  = 0;
        var dif_dias_fechas   = 0;
        var contador_domingos = 0;
        var dias_x_transcurrir  = 0;
        var venta_dias_x_transc = 0;
        var proyectado      = 0;
        var sugerido_compra   = 0;
        var comprar       = 0;
      var stock = 0;
        var venta_stock=0;
          var venta_stock_br=0;
              var cantidad_venta_piezas=0;
          var Vposible=0;
        var bComprar;
        var fecha_inicio_mes_f;
        var fecha_final_mes_f;
        var comprador;
        var es_numero     = false;
          var clasificacion       = 0;
var tipoCompra  = 0;  var comp =0;
        innerHtml+= '     <tr>';
        var record = records[r];
        for ( c = 1; c < columnNames.length; c++ ) {
          // Nombre de la columna
          var column = columnNames[c];
          var value = record[column];


            if (column.indexOf("punto_de_pedido") !== -1)continue;

 if (column.indexOf("Codigo_Cantamar") !== -1)continue;
  if (column.indexOf("Codigo_La_huerta") !== -1)continue;
   if (column.indexOf("Codigo_Villa_Purificacion") !== -1)continue;
    if (column.indexOf("Codigo_Fondeport") !== -1)continue;
     if (column.indexOf("Codigo_Monterrey") !== -1)continue;
      if (column.indexOf("Codigo_Tlaquepaque") !== -1)continue;
       if (column.indexOf("Codigo_Melaque") !== -1)continue;
        if (column.indexOf("Codigo_Autlan") !== -1)continue;


                     
                      if (column.indexOf("stock_optimo") !== -1)continue;
                      if (column.indexOf("sugerido_compra") !== -1)continue;

          if (column.indexOf("meses_c_inventario") !== -1)
            meses_inv += parseInt(value);
          else if (column.indexOf("venta_1_mes_atras") !== -1)
            venta_1_mes_atras += parseFloat(value);
      
        else if (column.indexOf("clasificacion") !== -1) 
  
          clasificacion = value.toString();
        if (column.indexOf("clasificacion") !== -1)continue;
      
            else if (column.indexOf("venta_1_mes_atras") !== -1)
                  venta_stock += parseFloat(value);
          else if (column.indexOf("venta_1_mes_futuro") !== -1)
            venta_1_mes_futuro += parseFloat(value);
          else if (column.indexOf("fecha_inicio_mes_f") !== -1)
            fecha_inicio_mes_f = value.toString();
          else if (column.indexOf("fecha_final_mes_f") !== -1)
            fecha_final_mes_f = value.toString();
          else if (column.indexOf("dif_dias_fechas") !== -1)
            dif_dias_fechas = parseFloat(value);
       
            else if (column.indexOf("vtas_tot") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';

        else if (column.indexOf("Vtas_tot_cantamar") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
                else if (column.indexOf("Vtas_tot_La_Huerta") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
                else if (column.indexOf("Vtas_tot_Villa_Purificacion") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
                else if (column.indexOf("Vtas_tot_Fondeport") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
                else if (column.indexOf("Vtas_tot_Tlaquepaque") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
                else if (column.indexOf("Vtas_tot_Melaque") !== -1)
          innerHtml += '    <td class="precio"  align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';


  else if (column.indexOf("cantidad_de_venta_en_piezas") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';


 else if (column.indexOf("Vtas_x_Dia_cantamar") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("stock_cantamar") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("Vtas_x_Dia_la_huerta") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("stock_la_huerta") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("Vtas_x_Dia_villa_purificacion") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("stock_villa_purificacion") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("Vtas_x_Dia_fondeport") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("stock_fondeport") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("Vtas_x_Dia_tlaquepaque") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("stock_tlaquepaque") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("Vtas_x_Dia_melaque") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
 else if (column.indexOf("stock_melaque") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
         else if (column.indexOf("cantidad_venta_piezas") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" class="c_piezas">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
         else if (column.indexOf("stock") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" class="c_piezas">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
           else if (column.indexOf("total_venta_cantamar") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" class="tot_canta">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
        else if (column.indexOf("Stock") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" class="hide">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
                else if (column.indexOf("stock") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseFloat(value).toFixed(0) : value) + '</td>';
            else if (column.indexOf("cantidad_venta_piezas") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseFloat(value).toFixed(0) : value) + '</td>';


else if (column.indexOf("cant_vtas_pz_ctm") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_ctm") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_ctm") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("cant_vtas_pz_hta") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_hta") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_hta") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("cant_vtas_pz_vla") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_vla") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_vla") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("cant_vtas_pz_fdp") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_fdp") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_fdp") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("cant_vtas_pz_tlq") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_tlq") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_tlq") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("cant_vtas_pz_mlq") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_mlq") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_mlq") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("cant_vtas_pz_may") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("vtas_x_dia_may") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';
else if (column.indexOf("stock_may") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value): parseInt(value)) + '</td>';

           else if (column.indexOf("Venta_Por_Dia") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';
           else if (column.indexOf("dias_invent_") !== -1)
          innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'" class="c_inventario">' + (es_numero ? parseInt(value).toFixed(0) : value) + '</td>';

          else{
            value = value === null ? '&nbsp;' : value.toString();
            if ( value.length > 300 ) {
              value = value.substring( 0, 297 ) + '...';
            }
            es_numero = c >= 8 && !isNaN(value) ? true : false;
            innerHtml += '    <td class="miEncabezado"  align="'+ (es_numero ? "right" : "right") +'">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
          }
          if (column.indexOf("cantidad_venta_piezas") !== -1)

            cantidad_venta_piezas = parseFloat(value);

          if (column.indexOf("stock") !== -1)
            stock = parseFloat(value);
          if (column.indexOf("venta_de_dia") !== -1)
            venta_de_dia = parseFloat(value);
          if (column.indexOf("pendiente_x_recibir") !== -1)
            pendiente_x_recibir = parseFloat(value);
          if (column.indexOf("sugerido_compra") !== -1)
            sugerido_compra = parseFloat(value);
          if (column.indexOf("comprador") !== -1)
            comprador = value.toString();
      
        }




      
        venta_totaldisponible=stock
        cobertura     = (disponible + 0) ;


        dias_x_transcurrir  = dif_dias_fechas - contador_domingos;
    
        proyectado      = Math.max(venta_prom_mensual, sugerido_compra, venta_1_mes_atras, venta_1_mes_futuro);
        proyectado      = comprador == 'Comprador 1' || comprador == 'Comprador 2' ? venta_prom_mensual : proyectado;
        comprar       = proyectado - disponible - pendiente_x_recibir;
        bComprar      = comprar > 0 ? "SI" : "";

       venta_diaria=cantidad_venta_piezas/dias2222
       Venta_con_stock_actual=0
        Venta_con_stock_actual=cobertura/venta_diaria

        if(cantidad_venta_piezas >0  )
          {Venta_con_stock_actual=cobertura/venta_diaria}
          else{  Venta_con_stock_actual=0}
        
              if(comprar   >0  ){
                comp=comprar
              }else{  comp=0}

    
                                                             
            


      

        innerHtml+= '     </tr>';
      }
      innerHtml+= '     </tbody>';
    }else {
      innerHtml+= '     <thead class="thead-light">';
      innerHtml+= '       <tr>';
      innerHtml+= '         <th></th>';
      innerHtml+= '         <th></th>';
      innerHtml+= '         <th></th>';
      innerHtml+= '         <th></th>';
      innerHtml+= '         <th></th>';
      innerHtml+= '       </tr>';
      innerHtml+= '     </thead>';
      innerHtml+= '     <tbody>';
      innerHtml+= '     </tbody>';
    }
    innerHtml+= '   </table>';
    /////////////tabla 3

    innerHtml+= '</div>';
      innerHtml+= '</div>';
    innerHtml+= '</div>';
    innerHtml+= '</td>';
    innerHtml+= '</tr>';
    innerHtml+= '</table>';
    innerHtml+= '<div id="myModal" class="modal hide fade bd-example-modal-lg" tabindex="-1" role="dialog" data-backdrop="static" aria-hidden="true">';
    innerHtml+= ' <div class="modal-dialog modal-sm">';
    innerHtml+= '   <div class="modal-content">';
    innerHtml+= '     <div class="modal-header">';
    innerHtml+= '       <h3 class="modal-title" id="staticBackdropLabel"><img src="https://5017898.secure.netsuite.com/core/media/media.nl?id=1218538&c=5017898&h=QRxtucrTkQdFoJrciA6UU--INdAQBQdP79dXoPO7tLooFPsr" width="30px">&nbsp;&nbsp;&nbsp;Procesando</h3>';
    innerHtml+= '     </div>';
    innerHtml+= '     <div class="modal-body">';
    innerHtml+= '       Generando reporte, espere...';
    innerHtml+= '     </div>';
    innerHtml+= '   </div>';
    innerHtml+= ' </div>';
    innerHtml+= '</div>';
    htmlField.defaultValue = generadorHtml(innerHtml, records.length);

    ///tabla2
  //tabla2
    log.audit({title:"Acceso a reporte", details:runtime.getCurrentUser().name});

    context.response.writePage( form );
  }

  function fechaHoy(){
    var today = new Date();
    var fecha = parseInt(today.getDate()) < 10 ? '0' + today.getDate() : today.getDate();
    fecha += '/';
    fecha += parseInt(today.getMonth() + 1) < 10 ? '0' + parseInt(today.getMonth() + 1) : parseInt(today.getMonth() + 1);
    fecha += '/';
    fecha += today.getFullYear();
    return fecha;
  }

  function columnasXMeses(anio,mes,dia,mes_ini,dia_ini,anio,anio_ini,log){
    var str     = "";
    var campoSuma = "";
    var campoStock  = "";
    var fechaInicio;
    var fechaFinal;
    var anio_anterior = anio - 1;
    switch (mes) {
      case '01':
        campoSuma = 'monto_venta_Enero_' + anio_anterior;
        campoSumaPza= 'cantidad_venta_Enero_' + anio_anterior;
        fechaInicio = '01/01/';
        fechaFinal  = '01/31/';
        fhFinal_mes = '12/31/'+ anio_anterior;
        break;
      case '02':
        campoSuma = 'monto_venta_Febrero_' + anio_anterior;
        campoSumaPza= 'cantidad_venta_Febrero_' + anio_anterior;
        fechaInicio = '02/01/';
        fechaFinal  = '02/29/';
        fhFinal_mes = '01/31/' + anio;
        break;
      case '03':
        campoSuma = 'monto_venta_Marzo_' + anio_anterior;
        campoSumaPza= 'cantidad_venta_Marzo_' + anio_anterior;
        fechaInicio = '03/01/';
        fechaFinal  = '03/31/';
        fhFinal_mes = '02/29/' + anio;
        break;
      case '04':
        campoSuma = 'monto_venta_Abril_' + anio_anterior;
        campoSumaPza= 'cantidad_venta_Abril_' + anio_anterior;
        fechaInicio = '04/01/';
        fechaFinal  = '04/30/';
        fhFinal_mes = '03/31/' + anio;
        break;
      case '05':
        campoSuma = 'monto_venta_Mayo_' + anio_anterior;
        campoSumaPza= 'cantidad_venta_Mayo_' + anio_anterior;
        fechaInicio = '05/01/';
        fechaFinal  = '05/31/';
        fhFinal_mes = '04/30/' + anio;
        break;
      case '06':
        campoSuma = 'monto_venta_Junio_' + anio_anterior;
        campoSumaPza= 'cantidad_venta_Junio_' + anio_anterior;
        fechaInicio = '06/01/';
        fechaFinal  = '06/30/';
        fhFinal_mes = '05/31/' + anio;
        break;
      case '07':
        campoSuma = 'monto_venta_Julio_' + anio_anterior;
        campoSumaPza= 'cantidad_venta_Julio_' + anio_anterior;
        fechaInicio = '07/01/';
        fechaFinal  = '07/31/';
        fhFinal_mes = '06/30/' + anio;
        break;
      case '08':
        campoSuma = 'monto_venta_Agosto_' + anio_anterior;
        campoSumaPza= 'cantidad_venta_Agosto_' + anio_anterior;
        fechaInicio = '08/01/';
        fechaFinal  = '08/31/';
        fhFinal_mes = '07/31/' + anio;
        break;
      case '09':
        campoSuma = 'monto_venta_Septiembre_' + anio_anterior;
        campoSumaPza= 'cantidad_venta_Septiembre_' + anio_anterior;
        fechaInicio = '09/01/';
        fechaFinal  = '09/30/';
        fhFinal_mes = '08/31/' + anio;
        break;
      case '10':
        campoSuma = 'monto_venta_Octubre_' + anio_anterior;
        campoSumaPza= 'cantidad_venta_Octubre_' + anio_anterior;
        fechaInicio = '10/01/';
        fechaFinal  = '10/31/';
        fhFinal_mes = '09/30/' + anio;
        break;
      case '11':
        campoSuma = 'monto_venta_Noviembre_' + anio_anterior;
        campoSumaPza= 'cantidad_venta_Noviembre_' + anio_anterior;
        fechaInicio = '11/01/';
        fechaFinal  = '11/30/';
        fhFinal_mes = '10/31/' + anio;
        break;
      case '12':
        campoSuma = 'monto_venta_Diciembre_' + anio_anterior;
        campoSumaPza= 'cantidad_venta_Diciembre_' + anio_anterior;
        fechaInicio = '12/01/';
        fechaFinal  = '12/31/';
        fhFinal_mes = '11/30/' + anio;
        break;
    }
    if (mes == 2) fechaFinal = validarFecha(fechaFinal + anio_anterior) ? fechaFinal : '02/28/';
    /** Total Ventas mismo mes / anio anterior */
  
    /** Total Ventas Piezas mismo mes / anio anterior */
  

    /** Ventas Piezas Anual */
  

    /** Venta 1 mes atrás */
    str+= "SUM( "+
        " CASE WHEN "+
        "   1 = 1 "+
        "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
        "   AND N1.trandate >= ADD_MONTHS(TRUNC(TO_DATE('"+ fechaFinal + anio +"', 'MM/DD/YYYY'),'MM'), -1) "+
        "   AND N1.trandate <= ADD_MONTHS(TRUNC(LAST_DAY(TO_DATE('"+ fechaFinal + anio +"', 'MM/DD/YYYY'))), -1) "+
        " THEN N1.stock * -1 "+
        " ELSE 0 "+
        " END) AS "+
        "venta_1_mes_atras, "+
        " ";

    /** Venta 1 mes futuro */
    str+= "SUM( "+
        " CASE WHEN "+
        "   1 = 1 "+
        "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
        "   AND N1.trandate >= TO_DATE('"+ fechaInicio + anio_anterior +"', 'MM/DD/YYYY') "+
        "   AND N1.trandate <= TO_DATE('"+ fechaFinal + anio_anterior +"', 'MM/DD/YYYY') "+
        " THEN N1.stock * -1 "+
        " ELSE 0 "+
        " END) AS "+
        "venta_1_mes_futuro, "+
        " ";
    str+= "(TRUNC(LAST_DAY(TO_DATE('"+ fechaInicio + anio +"', 'MM/DD/YYYY'))) - TO_DATE('"+ mes+"/"+dia+"/"+anio+"', 'MM/DD/YYYY') + 1) AS dif_dias_fechas, ";
    str+= "TO_DATE('"+ mes+"/"+dia+"/"+anio+"', 'MM/DD/YYYY') AS fecha_inicio_mes_f, ";
    str+= "TRUNC(LAST_DAY(TO_DATE('"+ fechaInicio + anio +"', 'MM/DD/YYYY'))) AS fecha_final_mes_f, ";
    // log.debug({title:"query", details:str});

    /** Total ventas */
    var venta_total ="Total_venta"
  
      str+= ",ROUND(SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+ mes_ini +"/"+ dia_ini +"/"+ anio_ini +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+ mes +"/"+ dia +"/"+  anio +"', 'MM/DD/YYYY') "+
          " THEN N1.netamount * -1 "+
          " ELSE 0 "+
          " END)) AS "+
          "Total_venta , "+
          " ";
    

    /** Meses con inventario ***/




    /** Total ventas Piezas */
  

          


    

    /** Stock */
  
    

      

    
    return str;
  }
  ///////////

  function columnasXMeses_cantamar(anio,mes,dia,mes_ini,dia_ini,anio,anio_ini,log){
    var str     = "";
    var campoSuma = "";
    var campoStock  = "";
    var fechaInicio;
    var fechaFinal;
    var anio_anterior = anio - 1;

    // log.debug({title:"query", details:str});

    /** Total ventas */
    var venta_total ="Total_venta"
  
      str= "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+ mes_ini +"/"+ dia_ini +"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+ mes +"/"+ dia +"/"+  anio +"', 'MM/DD/YYYY') "+
          " THEN N1.netamount * -1 "+
          " ELSE 0 "+
          " END) AS "+
          "Total_venta_cantamar , "+
          " ";


    
    return str;
  }

  function columnasXMeses_la_huerta(anio,mes,dia,mes_ini,dia_ini,anio,log){
    var str     = "";
    var campoSuma = "";
    var campoStock  = "";
    var fechaInicio;
    var fechaFinal;
    var anio_anterior = anio - 1;

    // log.debug({title:"query", details:str});

    /** Total ventas */
    var venta_total ="Total_venta"
  
      str= "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+ mes_ini +"/"+ dia_ini +"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+ mes +"/"+ dia +"/"+  anio +"', 'MM/DD/YYYY') "+
          " THEN N1.netamount * -1 "+
          " ELSE 0 "+
          " END) AS "+
          "Total_venta_la_huerta , "+
          " ";


    
    return str;
  }

  function columnasXMeses_villa_purificacion(anio,mes,dia,mes_ini,dia_ini,anio,log){
    var str     = "";
    var campoSuma = "";
    var campoStock  = "";
    var fechaInicio;
    var fechaFinal;
    var anio_anterior = anio - 1;

    // log.debug({title:"query", details:str});

    /** Total ventas */
    var venta_total ="Total_venta"
  
      str= "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+ mes_ini +"/"+ dia_ini +"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+ mes +"/"+ dia +"/"+  anio +"', 'MM/DD/YYYY') "+
          " THEN N1.netamount * -1 "+
          " ELSE 0 "+
          " END) AS "+
          "Total_venta_villa_purificacion , "+
          " ";


    
    return str;
  }
    function columnasXMeses_fondeport(anio,mes,dia,mes_ini,dia_ini,anio,log){
    var str     = "";
    var campoSuma = "";
    var campoStock  = "";
    var fechaInicio;
    var fechaFinal;
    var anio_anterior = anio - 1;

    // log.debug({title:"query", details:str});

    /** Total ventas */
    var venta_total ="Total_venta"
  
      str= "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+ mes_ini +"/"+ dia_ini +"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+ mes +"/"+ dia +"/"+  anio +"', 'MM/DD/YYYY') "+
          " THEN N1.netamount * -1 "+
          " ELSE 0 "+
          " END) AS "+
          "Total_venta_fondeport , "+
          " ";


    
    return str;
  }
      function columnasXMeses_monterrey(anio,mes,dia,mes_ini,dia_ini,anio,log){
    var str     = "";
    var campoSuma = "";
    var campoStock  = "";
    var fechaInicio;
    var fechaFinal;
    var anio_anterior = anio - 1;

    // log.debug({title:"query", details:str});

    /** Total ventas */
    var venta_total ="Total_venta"
  
      str= "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+ mes_ini +"/"+ dia_ini +"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+ mes +"/"+ dia +"/"+  anio +"', 'MM/DD/YYYY') "+
          " THEN N1.netamount * -1 "+
          " ELSE 0 "+
          " END) AS "+
          "Total_venta_monterrey , "+
          " ";


    
    return str;
  }
    function columnasXMeses_tlaquepaque(anio,mes,dia,mes_ini,dia_ini,anio,log){
    var str     = "";
    var campoSuma = "";
    var campoStock  = "";
    var fechaInicio;
    var fechaFinal;
    var anio_anterior = anio - 1;

    // log.debug({title:"query", details:str});

    /** Total ventas */
    var venta_total ="Total_venta"
  
      str= "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+ mes_ini +"/"+ dia_ini +"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+ mes +"/"+ dia +"/"+  anio +"', 'MM/DD/YYYY') "+
          " THEN N1.netamount * -1 "+
          " ELSE 0 "+
          " END) AS "+
          "Total_venta_tlaquepaque , "+
          " ";


    
    return str;
  }
    function columnasXMeses_melaque(anio,mes,dia,mes_ini,dia_ini,anio,log){
    var str     = "";
    var campoSuma = "";
    var campoStock  = "";
    var fechaInicio;
    var fechaFinal;
    var anio_anterior = anio - 1;

    // log.debug({title:"query", details:str});

    /** Total ventas */
    var venta_total ="Total_venta"
  
      str= "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+ mes_ini +"/"+ dia_ini +"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+ mes +"/"+ dia +"/"+  anio +"', 'MM/DD/YYYY') "+
          " THEN N1.netamount * -1 "+
          " ELSE 0 "+
          " END) AS "+
          "Total_venta_melaque , "+
          " ";


    
    return str;
  }
   function columnasXMeses_autlan(anio,mes,dia,mes_ini,dia_ini,anio,log){
    var str     = "";
    var campoSuma = "";
    var campoStock  = "";
    var fechaInicio;
    var fechaFinal;
    var anio_anterior = anio - 1;

    // log.debug({title:"query", details:str});

    /** Total ventas */
    var venta_total ="Total_venta"
  
      str= "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+ mes_ini +"/"+ dia_ini +"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+ mes +"/"+ dia +"/"+  anio +"', 'MM/DD/YYYY') "+
          " THEN N1.netamount * -1 "+
          " ELSE 0 "+
          " END) AS "+
          "Total_venta_autlan , "+
          " ";


    
    return str;
  }

  //////////
  function calcula_ventastock(anio){
  str1+=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.IsInventoryAffecting = 'T' "+
          "   AND N1.Voided = 'F' "+
        
          "   AND N1.trandate <= TO_DATE('12/01/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN n1.stock "+
          " ELSE 0 "+
          " END) AS "+
          "Stock1, "+
          " ";


    return str1;
  }

  function validarFecha(fecha){

    var parts = fecha.split("/");
    var day   = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year  = parseInt(parts[2], 10);

    // Rangos de año y mes
    if(year < 2000 || year > 3000 || month == 0 || month > 12)
    return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Años bisiestos
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

    return day > 0 && day <= monthLength[month - 1];
  }

  function generadorHtml(table, records){
      var html = "";


html += '<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>';
 html += ' <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>';

    html += '<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">';
      html += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">';

      html += '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>';
      html += '<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.css">';
      html += '<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.js"></script>';
      html += '<link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.6.2/css/buttons.dataTables.min.css">';
      html += '<script src="https://cdn.datatables.net/buttons/1.6.2/js/dataTables.buttons.min.js"></script>';
      html += '<script src="https://cdn.datatables.net/buttons/1.6.2/js/buttons.html5.min.js"></script>';
       html += '<script src="https://code.jquery.com/jquery-3.7.0.js"></script>';
  html += '<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>';
  html += '<script src="https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js"></script>';
  html += '<script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js"></script>';
      html += '<script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.53/build/vfs_fonts.js"></script>';
      html += '<script src="https://cdn.datatables.net/buttons/1.6.2/js/buttons.flash.min.js"></script>';
      html += '<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>';

      html += '<style type = "text/css">'

     


 html+='table {'
    html+='border-collapse: collapse;'
    html+='width: 100%;'
  html+='}'

  html+='th {'
    html+='width: 33.33%; /* Esto divide el espacio en tres partes iguales */'
    html+='text-align: center;'
    html+='font-size: 12px; /* Tamaño de fuente, si lo deseas */'
  html+='}'
    html += ' .rojo{';
      html += '   background-color: #FE9797;';
      html += ' }';
      html += ' .verde{';
      html += '   background-color: #A6CFAF;';
      html += ' }';
      html += ' .amarillo{';
      html += '   background-color: #F7FA8F;';
      html += ' }';
       html += ' .miEncabezado {'
   html += ' font-size: 9px; '
  html += '}'
   html += ' .precio {'
   html += ' font-size: 9px; '
  html += '}'
html += '.thpequeno {'
    html += 'font-size: 12px; '
    html += 'padding: 5px; '
html += '}'

html += '.ddda {'
    html += 'line-height: 5px; '
     html += 'line-width : 5px; '
html += '}'

html += '#resultsTable {'
  html += 'width: 12%; '
  html += 'border-collapse: collapse;'
html += '}'
      html += '</style>'
      html += table;
      html += '<script>';
      //////////

      
      html += ' $("#resultsTable2").hide();'
        html += ' $("#resultsTable3").hide();'
      ///////////
      html += ' $("#submitter").click(function(){$("#myModal").modal("show")});';
      html += ' $("#resultsTable").DataTable({';
      html += records > 0 ? '   "order": [[2, "desc"]],' : '';
      html += '   "initComplete": function(){';
      html += '     $("#resultsDiv").show(); ';
      html += '   },';
    
      html += '   "pageLength": 200,';
      html += '   "language": {"url":"https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"}';
    

      html += ' }';
      html += ');';
    
      html += "$('#botonImprimir').click(function(){ $('#resultsTable2').show();"
        html += "var contenidoTabla = $('#resultsTable2').prop('outerHTML');"
        html += "var ventanaImpresion = window.open('', '_blank');"
        html += "ventanaImpresion.document.write('<html><head><title>Impresión</title>');"
        html += "ventanaImpresion.document.write('<style>@media print { @page { size: landscape; } }</style>'); "
        html += "ventanaImpresion.document.write('</head><body>');"
        html += "ventanaImpresion.document.write(contenidoTabla);"
        html += "ventanaImpresion.document.write('</body></html>');"
        html += "ventanaImpresion.document.close();"
        html += "ventanaImpresion.print();"
        html += "ventanaImpresion.close(); $('#resultsTable2').hide();"
        html += "});"




  html += 'document.getElementById("exportarExcel").addEventListener("click", function () {'
      html += 'exportarTablaAExcel("resultsTable3", "Nivelacion de Inventarios");'
    html += '});'

    html += 'function exportarTablaAExcel(tableId, filename) {'
      html += 'const tabla = document.getElementById(tableId);'
      html += 'const rows = tabla.querySelectorAll("tr");'

    // Crear un objeto Blob para el contenido de la tabla
     html += ' const blobData = new Blob([tablaToExcel(rows)], { type: "application/vnd.ms-excel" });'

    // Crear un enlace para descargar el archivo
     html += 'const link = document.createElement("a");'
      html += 'link.href = window.URL.createObjectURL(blobData);'
      html += 'link.download = filename + ".xls";'

    // Simular clic en el enlace para iniciar la descarga
     html += ' document.body.appendChild(link);'
     html += ' link.click();'
     html += ' document.body.removeChild(link);'
    html += '}'

    html += 'function tablaToExcel(rows) {'
      html += 'let excelData = "<table>";'
      html += 'for (let i = 0; i < rows.length; i++) {'
        html += 'const cells = rows[i].querySelectorAll("td, th");'
        html += 'excelData += "<tr>";'
        html += 'for (let j = 0; j < cells.length; j++) {'
         html += ' excelData += "<td>" + cells[j].innerText + "</td>";'
        html += '}'
        html += 'excelData += "</tr>";'
      html += '}'
      html += 'excelData += "</table>";'
      html += 'return excelData;'
    html += '}'






        html += 'var precios = document.querySelectorAll(".precio");';

 html += ' precios.forEach(function(precio) {';
   html += ' var  valor =0;var valor = parseFloat(precio.textContent); ';
   html += ' if (isNaN(valor)) {precio.textContent ="$0";}';
  html += '  else {precio.textContent = valor.toLocaleString("en-US", { style: "currency", currency: "USD" });}';
  //cantidad_venta_piezas c_piezas //cantidad_venta_piezas c_piezas
  html += '});'; 




 html += '  var tabla = document.getElementById("resultsTable");'
 html += ' var columna0 = 0; '
 html += ' var columna1 = 1; '
 html += ' var columna2 = 2; '
html += ' var columna3 = 3; '
 html += ' var columna4 = 4; '
html += ' var columna5 = 5; '
html += ' var columna6 = 6; '
html += ' var columna7 = 7; '
html += ' var columna12 = 12; '
html += ' var columna17 = 17; '
html += ' var columna22 = 22; '
html += ' var columna27 = 27; '
html += ' var columna32 = 32; '
html += ' var columna37 = 37; '
html += ' var columna42 = 42; '

html += ' var columna8=8;'
html += ' var columna13=13;'
html += ' var columna18=18;'
html += ' var columna23=23;'
html += ' var columna28=28;'
html += ' var columna33=33;'

html += ' var columna11 = 11; '
html += ' var columna16 = 16; '
html += ' var columna21 = 21; '
html += ' var columna26 = 26; '
html += ' var columna31 = 31; '
html += ' var columna36 = 36; '
html += ' var columna41 = 41; '

html += ' for (var i = 0; i < tabla.rows.length; i++) {'

html += 'if(i==0){'

   html += '  tabla.rows[i].cells[7].style.backgroundColor = "#E1E1F7";' 
  html += '}' 

html += 'if(i==1){'

   html += '  tabla.rows[i].cells[7].style.backgroundColor = "#E1E1F7";' 
  html += '}' 
  html += 'if(i==2){'

   html += '  tabla.rows[i].cells[7].style.backgroundColor = "#E1E1F7";' 
  html += '}' 
html += 'if(i>2){'



   html += '  tabla.rows[i].cells[columna0].style.backgroundColor = "#E1E1F7";' 
     html += '  tabla.rows[i].cells[columna1].style.backgroundColor = "#E1E1F7";' 
       html += '  tabla.rows[i].cells[columna2].style.backgroundColor = "#E1E1F7";' 
         html += '  tabla.rows[i].cells[columna3].style.backgroundColor = "#E1E1F7";' 
              html += '  tabla.rows[i].cells[columna4].style.backgroundColor = "#E1E1F7";' 
               html += '  tabla.rows[i].cells[columna5].style.backgroundColor = "#E1E1F7";' 
        
     html += '  tabla.rows[i].cells[columna11].style.backgroundColor = "#EEF7EF";' 
       html += '  tabla.rows[i].cells[columna16].style.backgroundColor = "#EEF7EF";' 
   
         html += '  tabla.rows[i].cells[columna21].style.backgroundColor = "#EEF7EF";' 
  html += '  tabla.rows[i].cells[columna26].style.backgroundColor = "#EEF7EF";' 
  html += '  tabla.rows[i].cells[columna31].style.backgroundColor = "#EEF7EF";' 
   html += '  tabla.rows[i].cells[columna36].style.backgroundColor = "#EEF7EF";' 
 
 html += 'var valorCeldaColumna6 = tabla.rows[i].cells[columna6].innerHTML; ;'

     html += 'if(valorCeldaColumna6>=5){tabla.rows[i].cells[columna6].style.backgroundColor = "#F4AC6C";}'
html += 'if(valorCeldaColumna6<=15){tabla.rows[i].cells[columna6].style.backgroundColor = "#F4AC6C";}'
html += 'if(valorCeldaColumna6>=16){tabla.rows[i].cells[columna6].style.backgroundColor = "#EEF7EF";}'

html += 'if(valorCeldaColumna6>=60){tabla.rows[i].cells[columna6].style.backgroundColor = "#FFFCA4";}'
html += 'if(valorCeldaColumna6>=120){tabla.rows[i].cells[columna6].style.backgroundColor = "#98EBA1";}'
html += 'if(valorCeldaColumna6>=150){tabla.rows[i].cells[columna6].innerHTML="150+";}'
     html += 'if(valorCeldaColumna6<=5){tabla.rows[i].cells[columna6].style.backgroundColor = "#E26663";}'
 

 html += 'var valorCeldaColumna11 = tabla.rows[i].cells[columna11].innerHTML; ;'

  html += 'if(valorCeldaColumna11>=6){tabla.rows[i].cells[columna11].style.backgroundColor = "#F4AC6C";}'

html += 'if(valorCeldaColumna11<=15){tabla.rows[i].cells[columna11].style.backgroundColor = "#F4AC6C";}'
html += 'if(valorCeldaColumna11>=16){tabla.rows[i].cells[columna11].style.backgroundColor = "#EEF7EF";}'

html += 'if(valorCeldaColumna11>=60){tabla.rows[i].cells[columna11].style.backgroundColor = "#FFFCA4";}'
html += 'if(valorCeldaColumna11>=120){tabla.rows[i].cells[columna11].style.backgroundColor = "#98EBA1";}'
html += 'if(valorCeldaColumna11>=150){tabla.rows[i].cells[columna11].innerHTML="150+";}'




     html += 'if(valorCeldaColumna11<=5){tabla.rows[i].cells[columna11].style.backgroundColor = "#E26663";}'


      html += 'var valorCeldaColumna16 = tabla.rows[i].cells[columna16].innerHTML; '
 html += 'if(valorCeldaColumna16>=6){tabla.rows[i].cells[columna16].style.backgroundColor = "#F4AC6C";}'
html += 'if(valorCeldaColumna16<=15){tabla.rows[i].cells[columna16].style.backgroundColor = "#F4AC6C";}'
html += 'if(valorCeldaColumna16>=16){tabla.rows[i].cells[columna16].style.backgroundColor = "#EEF7EF";}'

html += 'if(valorCeldaColumna16>=60){tabla.rows[i].cells[columna16].style.backgroundColor = "#FFFCA4";}'
html += 'if(valorCeldaColumna16>=120){tabla.rows[i].cells[columna16].style.backgroundColor = "#98EBA1";}'
html += 'if(valorCeldaColumna16>=150){tabla.rows[i].cells[columna16].innerHTML="150+";}'
     html += 'if(valorCeldaColumna16<=5){tabla.rows[i].cells[columna16].style.backgroundColor = "#E26663";}'

  html += 'var valorCeldaColumna21 = tabla.rows[i].cells[columna21].innerHTML; ;'
  

         html += 'if(valorCeldaColumna21>=6){tabla.rows[i].cells[columna21].style.backgroundColor = "#F4AC6C";}'
html += 'if(valorCeldaColumna21<=15){tabla.rows[i].cells[columna21].style.backgroundColor = "#F4AC6C";}'
html += 'if(valorCeldaColumna21>=16){tabla.rows[i].cells[columna21].style.backgroundColor = "#EEF7EF";}'

html += 'if(valorCeldaColumna21>=60){tabla.rows[i].cells[columna21].style.backgroundColor = "#FFFCA4";}'
html += 'if(valorCeldaColumna21>=120){tabla.rows[i].cells[columna21].style.backgroundColor = "#98EBA1";}'
html += 'if(valorCeldaColumna21>=150){tabla.rows[i].cells[columna21].innerHTML="150+";}'
   html += 'if(valorCeldaColumna21<=5){tabla.rows[i].cells[columna21].style.backgroundColor = "#E26663";}'

  html += 'var valorCeldaColumna26 = tabla.rows[i].cells[columna26].innerHTML; ;'
   

      html += 'if(valorCeldaColumna26>=6){tabla.rows[i].cells[columna26].style.backgroundColor = "#F4AC6C";}'
html += 'if(valorCeldaColumna26<=15){tabla.rows[i].cells[columna26].style.backgroundColor = "#F4AC6C";}'
html += 'if(valorCeldaColumna26>=16){tabla.rows[i].cells[columna26].style.backgroundColor = "#EEF7EF";}'

html += 'if(valorCeldaColumna26>=60){tabla.rows[i].cells[columna26].style.backgroundColor = "#FFFCA4";}'
html += 'if(valorCeldaColumna26>=120){tabla.rows[i].cells[columna26].style.backgroundColor = "#98EBA1";}'
html += 'if(valorCeldaColumna26>=150){tabla.rows[i].cells[columna26].innerHTML="150+";}'
  html += 'if(valorCeldaColumna26<=5){tabla.rows[i].cells[columna26].style.backgroundColor = "#E26663";}'
  html += 'var valorCeldaColumna31 = tabla.rows[i].cells[columna31].innerHTML; ;'


      html += 'if(valorCeldaColumna31>=6){tabla.rows[i].cells[columna31].style.backgroundColor = "#F4AC6C";}'
html += 'if(valorCeldaColumna31<=15){tabla.rows[i].cells[columna31].style.backgroundColor = "#F4AC6C";}'
html += 'if(valorCeldaColumna31>=16){tabla.rows[i].cells[columna31].style.backgroundColor = "#EEF7EF";}'

html += 'if(valorCeldaColumna31>=60){tabla.rows[i].cells[columna31].style.backgroundColor = "#FFFCA4";}'
html += 'if(valorCeldaColumna31>=120){tabla.rows[i].cells[columna31].style.backgroundColor = "#98EBA1";}'
html += 'if(valorCeldaColumna31>=150){tabla.rows[i].cells[columna31].innerHTML="150+";}'
     html += 'if(valorCeldaColumna31<=5){tabla.rows[i].cells[columna31].style.backgroundColor = "#E26663";}'
  html += 'var valorCeldaColumna36 = tabla.rows[i].cells[columna36].innerHTML; ;'

     html += 'if(valorCeldaColumna36>=6){tabla.rows[i].cells[columna36].style.backgroundColor = "#F4AC6C";}'
html += 'if(valorCeldaColumna36<=15){tabla.rows[i].cells[columna36].style.backgroundColor = "#F4AC6C";}'
html += 'if(valorCeldaColumna36>=16){tabla.rows[i].cells[columna36].style.backgroundColor = "#EEF7EF";}'

html += 'if(valorCeldaColumna36>=60){tabla.rows[i].cells[columna36].style.backgroundColor = "#FFFCA4";}'
html += 'if(valorCeldaColumna36>=120){tabla.rows[i].cells[columna36].style.backgroundColor = "#98EBA1";}'

html += 'if(valorCeldaColumna36>=150){tabla.rows[i].cells[columna36].innerHTML="150+";}'

     html += 'if(valorCeldaColumna36<=5){tabla.rows[i].cells[columna36].style.backgroundColor = "#E26663";}'

       html += 'var valorCeldaColumna41 = tabla.rows[i].cells[columna41].innerHTML; ;'

     html += 'if(valorCeldaColumna41>=6){tabla.rows[i].cells[columna41].style.backgroundColor = "#F4AC6C";}'
html += 'if(valorCeldaColumna41<=15){tabla.rows[i].cells[columna41].style.backgroundColor = "#F4AC6C";}'
html += 'if(valorCeldaColumna41>=16){tabla.rows[i].cells[columna41].style.backgroundColor = "#EEF7EF";}'

html += 'if(valorCeldaColumna41>=60){tabla.rows[i].cells[columna41].style.backgroundColor = "#FFFCA4";}'
html += 'if(valorCeldaColumna41>=120){tabla.rows[i].cells[columna41].style.backgroundColor = "#98EBA1";}'

html += 'if(valorCeldaColumna41>=150){tabla.rows[i].cells[columna41].innerHTML="150+";}'

     html += 'if(valorCeldaColumna41<=5){tabla.rows[i].cells[columna41].style.backgroundColor = "#E26663";}'
     html += 'var valorCeldaColumna10 = tabla.rows[i].cells[10].innerHTML;  '
     html += 'var valorCeldaColumna9 = tabla.rows[i].cells[9].innerHTML;  '
     html += 'if (valorCeldaColumna9 == 0 && valorCeldaColumna10 >=1) { tabla.rows[i].cells[10].style.backgroundColor = "#9E42BE"; } '
     
     html += 'var valorCeldaColumna15 = tabla.rows[i].cells[15].innerHTML;  '
     html += 'var valorCeldaColumna14 = tabla.rows[i].cells[14].innerHTML;  '
     html += 'if (valorCeldaColumna14 == 0 && valorCeldaColumna15 >=1) { tabla.rows[i].cells[15].style.backgroundColor = "#9E42BE"; } '

     html += 'var valorCeldaColumna20 = tabla.rows[i].cells[20].innerHTML;  '
     html += 'var valorCeldaColumna19 = tabla.rows[i].cells[19].innerHTML;   '
     html += 'if (valorCeldaColumna19 == 0 && valorCeldaColumna20 >=1) { tabla.rows[i].cells[20].style.backgroundColor = "#9E42BE"; } '

     html += 'var valorCeldaColumna25 = tabla.rows[i].cells[25].innerHTML;  '
     html += 'var valorCeldaColumna24 = tabla.rows[i].cells[24].innerHTML;   '
     html += 'if (valorCeldaColumna24 == 0 && valorCeldaColumna25 >=1) { tabla.rows[i].cells[25].style.backgroundColor = "#9E42BE"; } '


     html += 'var valorCeldaColumna30 = tabla.rows[i].cells[30].innerHTML;  '
     html += 'var valorCeldaColumna29 = tabla.rows[i].cells[29].innerHTML;  '
     html += 'if (valorCeldaColumna29 == 0 && valorCeldaColumna30 >=1) { tabla.rows[i].cells[30].style.backgroundColor = "#9E42BE"; } '
     
     html += 'var valorCeldaColumna35= tabla.rows[i].cells[35].innerHTML;  '
     html += 'var valorCeldaColumna34 = tabla.rows[i].cells[34].innerHTML;   '
     html += 'if (valorCeldaColumna34 == 0 && valorCeldaColumna35 >=1) { tabla.rows[i].cells[35].style.backgroundColor = "#9E42BE"; } '

     html += 'var valorCeldaColumna40= tabla.rows[i].cells[40].innerHTML;  '
     html += 'var valorCeldaColumna39 = tabla.rows[i].cells[39].innerHTML; '
   
     html += 'if (valorCeldaColumna39 == 0 && valorCeldaColumna40 >=1) { tabla.rows[i].cells[40].style.backgroundColor = "#9E42BE"; } '
 html += '}';


  html += '}';


   html+="$('#resultsTable tr').each(function() {"
        html+="$(this).find('td:eq(7), th:eq(7)').hide(); "
        html+="$(this).find('td:eq(12), th:eq(12)').hide(); "
        html+="$(this).find('td:eq(17), th:eq(17)').hide(); "
        html+="$(this).find('td:eq(22), th:eq(22)').hide(); "
        html+="$(this).find('td:eq(27), th:eq(27)').hide(); "
        html+="$(this).find('td:eq(32), th:eq(32)').hide(); "
        html+="$(this).find('td:eq(37), th:eq(37)').hide(); "
        html+="$(this).find('td:eq(42), th:eq(42)').hide(); "
    html+="});"




  //Defino los totales de mis 2 columnas en 0 venta_total

  html+="var total_col1 = 0;"
  html+="var total_col2 = 0;"
  //Recorro todos los tr ubicados en el tbody
  html+="$('#resultsTable tbody').find('tr').each(function (i, el) {"
             
        //Voy incrementando las variables segun la fila ( .eq(0) representa la fila 1 )     
       html+=" total_col1 += parseFloat($(this).find('td').eq(3).text());"
          html+=" total_col2+= parseFloat($(this).find('td').eq(42).text());"
                
    html+="});"

     html+='var total_col2=total_col2.toLocaleString("en-US", { style: "currency", currency: "USD" });'
    //Muestro el resultado en el th correspondiente a la columna
    html+="$('#Piezas_total').val('venta total en piezas '+ total_col1 );"
    html+="$('#venta_total').val('venta total  '+ total_col2 );"


   html += "$('#resultsTable td').each(function() {"
        html += " var text = $(this).text();"
         html += "var newText = '';"

         html += "for (var i = 0; i < text.length; i += 15) {"
            html += " newText += text.slice(i, i + 15) + '<br>';"
         html += "}"

         html += "$(this).html(newText);"
     html += "});"



 
     html += '  var tabla = document.getElementById("resultsTable2");'
     html += ' var columna0 = 0; '
     html += ' var columna1 = 1; '
     html += ' var columna2 = 2; '
    html += ' var columna3 = 3; '
     html += ' var columna4 = 4; '
    html += ' var columna5 = 5; '
    html += ' var columna6 = 6; '
    html += ' var columna7 = 7; '
    html += ' var columna12 = 12; '
    html += ' var columna17 = 17; '
    html += ' var columna22 = 22; '
    html += ' var columna27 = 27; '
    html += ' var columna32 = 32; '
    html += ' var columna37 = 37; '
    html += ' var columna42 = 42; '
    
    html += ' var columna8=8;'
    html += ' var columna13=13;'
    html += ' var columna18=18;'
    html += ' var columna23=23;'
    html += ' var columna28=28;'
    html += ' var columna33=33;'
    
    html += ' var columna11 = 11; '
    html += ' var columna16 = 16; '
    html += ' var columna21 = 21; '
    html += ' var columna26 = 26; '
    html += ' var columna31 = 31; '
    html += ' var columna36 = 36; '
    html += ' var columna41 = 41; '
    
    html += ' for (var i = 0; i < tabla.rows.length; i++) {'
    
    html += 'if(i==0){'
    
       html += '  tabla.rows[i].cells[7].style.backgroundColor = "#E1E1F7";' 
      html += '}' 
    
    html += 'if(i==1){'
    
       html += '  tabla.rows[i].cells[7].style.backgroundColor = "#E1E1F7";' 
      html += '}' 
      html += 'if(i==2){'
    
       html += '  tabla.rows[i].cells[7].style.backgroundColor = "#E1E1F7";' 
      html += '}' 
    html += 'if(i>2){'
    
    
    
       html += '  tabla.rows[i].cells[columna0].style.backgroundColor = "#E1E1F7";' 
         html += '  tabla.rows[i].cells[columna1].style.backgroundColor = "#E1E1F7";' 
           html += '  tabla.rows[i].cells[columna2].style.backgroundColor = "#E1E1F7";' 
             html += '  tabla.rows[i].cells[columna3].style.backgroundColor = "#E1E1F7";' 
                  html += '  tabla.rows[i].cells[columna4].style.backgroundColor = "#E1E1F7";' 
                   html += '  tabla.rows[i].cells[columna5].style.backgroundColor = "#E1E1F7";' 
            
         html += '  tabla.rows[i].cells[columna11].style.backgroundColor = "#EEF7EF";' 
           html += '  tabla.rows[i].cells[columna16].style.backgroundColor = "#EEF7EF";' 
       
             html += '  tabla.rows[i].cells[columna21].style.backgroundColor = "#EEF7EF";' 
      html += '  tabla.rows[i].cells[columna26].style.backgroundColor = "#EEF7EF";' 
      html += '  tabla.rows[i].cells[columna31].style.backgroundColor = "#EEF7EF";' 
       html += '  tabla.rows[i].cells[columna36].style.backgroundColor = "#EEF7EF";' 
     
     html += 'var valorCeldaColumna6 = tabla.rows[i].cells[columna6].innerHTML; ;'
    
         html += 'if(valorCeldaColumna6>=5){tabla.rows[i].cells[columna6].style.backgroundColor = "#F4AC6C";}'
    html += 'if(valorCeldaColumna6<=15){tabla.rows[i].cells[columna6].style.backgroundColor = "#F4AC6C";}'
    html += 'if(valorCeldaColumna6>=16){tabla.rows[i].cells[columna6].style.backgroundColor = "#EEF7EF";}'
    
    html += 'if(valorCeldaColumna6>=60){tabla.rows[i].cells[columna6].style.backgroundColor = "#FFFCA4";}'
    html += 'if(valorCeldaColumna6>=120){tabla.rows[i].cells[columna6].style.backgroundColor = "#98EBA1";}'
    html += 'if(valorCeldaColumna6>=150){tabla.rows[i].cells[columna6].innerHTML="150+";}'
         html += 'if(valorCeldaColumna6<=5){tabla.rows[i].cells[columna6].style.backgroundColor = "#E26663";}'
     
    
     html += 'var valorCeldaColumna11 = tabla.rows[i].cells[columna11].innerHTML; ;'
    
      html += 'if(valorCeldaColumna11>=6){tabla.rows[i].cells[columna11].style.backgroundColor = "#F4AC6C";}'
    
    html += 'if(valorCeldaColumna11<=15){tabla.rows[i].cells[columna11].style.backgroundColor = "#F4AC6C";}'
    html += 'if(valorCeldaColumna11>=16){tabla.rows[i].cells[columna11].style.backgroundColor = "#EEF7EF";}'
    
    html += 'if(valorCeldaColumna11>=60){tabla.rows[i].cells[columna11].style.backgroundColor = "#FFFCA4";}'
    html += 'if(valorCeldaColumna11>=120){tabla.rows[i].cells[columna11].style.backgroundColor = "#98EBA1";}'
    html += 'if(valorCeldaColumna11>=150){tabla.rows[i].cells[columna11].innerHTML="150+";}'
    
    
    
    
         html += 'if(valorCeldaColumna11<=5){tabla.rows[i].cells[columna11].style.backgroundColor = "#E26663";}'
    
    
          html += 'var valorCeldaColumna16 = tabla.rows[i].cells[columna16].innerHTML; '
     html += 'if(valorCeldaColumna16>=6){tabla.rows[i].cells[columna16].style.backgroundColor = "#F4AC6C";}'
    html += 'if(valorCeldaColumna16<=15){tabla.rows[i].cells[columna16].style.backgroundColor = "#F4AC6C";}'
    html += 'if(valorCeldaColumna16>=16){tabla.rows[i].cells[columna16].style.backgroundColor = "#EEF7EF";}'
    
    html += 'if(valorCeldaColumna16>=60){tabla.rows[i].cells[columna16].style.backgroundColor = "#FFFCA4";}'
    html += 'if(valorCeldaColumna16>=120){tabla.rows[i].cells[columna16].style.backgroundColor = "#98EBA1";}'
    html += 'if(valorCeldaColumna16>=150){tabla.rows[i].cells[columna16].innerHTML="150+";}'
         html += 'if(valorCeldaColumna16<=5){tabla.rows[i].cells[columna16].style.backgroundColor = "#E26663";}'
    
      html += 'var valorCeldaColumna21 = tabla.rows[i].cells[columna21].innerHTML; ;'
      
    
             html += 'if(valorCeldaColumna21>=6){tabla.rows[i].cells[columna21].style.backgroundColor = "#F4AC6C";}'
    html += 'if(valorCeldaColumna21<=15){tabla.rows[i].cells[columna21].style.backgroundColor = "#F4AC6C";}'
    html += 'if(valorCeldaColumna21>=16){tabla.rows[i].cells[columna21].style.backgroundColor = "#EEF7EF";}'
    
    html += 'if(valorCeldaColumna21>=60){tabla.rows[i].cells[columna21].style.backgroundColor = "#FFFCA4";}'
    html += 'if(valorCeldaColumna21>=120){tabla.rows[i].cells[columna21].style.backgroundColor = "#98EBA1";}'
    html += 'if(valorCeldaColumna21>=150){tabla.rows[i].cells[columna21].innerHTML="150+";}'
       html += 'if(valorCeldaColumna21<=5){tabla.rows[i].cells[columna21].style.backgroundColor = "#E26663";}'
    
      html += 'var valorCeldaColumna26 = tabla.rows[i].cells[columna26].innerHTML; ;'
       
    
          html += 'if(valorCeldaColumna26>=6){tabla.rows[i].cells[columna26].style.backgroundColor = "#F4AC6C";}'
    html += 'if(valorCeldaColumna26<=15){tabla.rows[i].cells[columna26].style.backgroundColor = "#F4AC6C";}'
    html += 'if(valorCeldaColumna26>=16){tabla.rows[i].cells[columna26].style.backgroundColor = "#EEF7EF";}'
    
    html += 'if(valorCeldaColumna26>=60){tabla.rows[i].cells[columna26].style.backgroundColor = "#FFFCA4";}'
    html += 'if(valorCeldaColumna26>=120){tabla.rows[i].cells[columna26].style.backgroundColor = "#98EBA1";}'
    html += 'if(valorCeldaColumna26>=150){tabla.rows[i].cells[columna26].innerHTML="150+";}'
      html += 'if(valorCeldaColumna26<=5){tabla.rows[i].cells[columna26].style.backgroundColor = "#E26663";}'
      html += 'var valorCeldaColumna31 = tabla.rows[i].cells[columna31].innerHTML; ;'
    
    
          html += 'if(valorCeldaColumna31>=6){tabla.rows[i].cells[columna31].style.backgroundColor = "#F4AC6C";}'
    html += 'if(valorCeldaColumna31<=15){tabla.rows[i].cells[columna31].style.backgroundColor = "#F4AC6C";}'
    html += 'if(valorCeldaColumna31>=16){tabla.rows[i].cells[columna31].style.backgroundColor = "#EEF7EF";}'
    
    html += 'if(valorCeldaColumna31>=60){tabla.rows[i].cells[columna31].style.backgroundColor = "#FFFCA4";}'
    html += 'if(valorCeldaColumna31>=120){tabla.rows[i].cells[columna31].style.backgroundColor = "#98EBA1";}'
    html += 'if(valorCeldaColumna31>=150){tabla.rows[i].cells[columna31].innerHTML="150+";}'
         html += 'if(valorCeldaColumna31<=5){tabla.rows[i].cells[columna31].style.backgroundColor = "#E26663";}'
      html += 'var valorCeldaColumna36 = tabla.rows[i].cells[columna36].innerHTML; ;'
    
         html += 'if(valorCeldaColumna36>=6){tabla.rows[i].cells[columna36].style.backgroundColor = "#F4AC6C";}'
    html += 'if(valorCeldaColumna36<=15){tabla.rows[i].cells[columna36].style.backgroundColor = "#F4AC6C";}'
    html += 'if(valorCeldaColumna36>=16){tabla.rows[i].cells[columna36].style.backgroundColor = "#EEF7EF";}'
    
    html += 'if(valorCeldaColumna36>=60){tabla.rows[i].cells[columna36].style.backgroundColor = "#FFFCA4";}'
    html += 'if(valorCeldaColumna36>=120){tabla.rows[i].cells[columna36].style.backgroundColor = "#98EBA1";}'
    
    html += 'if(valorCeldaColumna36>=150){tabla.rows[i].cells[columna36].innerHTML="150+";}'
    
         html += 'if(valorCeldaColumna36<=5){tabla.rows[i].cells[columna36].style.backgroundColor = "#E26663";}'
    
           html += 'var valorCeldaColumna41 = tabla.rows[i].cells[columna41].innerHTML; ;'
    
         html += 'if(valorCeldaColumna41>=6){tabla.rows[i].cells[columna41].style.backgroundColor = "#F4AC6C";}'
    html += 'if(valorCeldaColumna41<=15){tabla.rows[i].cells[columna41].style.backgroundColor = "#F4AC6C";}'
    html += 'if(valorCeldaColumna41>=16){tabla.rows[i].cells[columna41].style.backgroundColor = "#EEF7EF";}'
    
    html += 'if(valorCeldaColumna41>=60){tabla.rows[i].cells[columna41].style.backgroundColor = "#FFFCA4";}'
    html += 'if(valorCeldaColumna41>=120){tabla.rows[i].cells[columna41].style.backgroundColor = "#98EBA1";}'
    
    html += 'if(valorCeldaColumna41>=150){tabla.rows[i].cells[columna41].innerHTML="150+";}'
    
         html += 'if(valorCeldaColumna41<=5){tabla.rows[i].cells[columna41].style.backgroundColor = "#E26663";}'

         html += 'var valorCeldaColumna10 = tabla.rows[i].cells[10].innerHTML;  '
         html += 'var valorCeldaColumna9 = tabla.rows[i].cells[9].innerHTML;  '
         html += 'if (valorCeldaColumna9 == 0 && valorCeldaColumna10 >=1) { tabla.rows[i].cells[10].style.backgroundColor = "#9E42BE"; } '
         
         html += 'var valorCeldaColumna15 = tabla.rows[i].cells[15].innerHTML;  '
         html += 'var valorCeldaColumna14 = tabla.rows[i].cells[14].innerHTML;  '
         html += 'if (valorCeldaColumna14 == 0 && valorCeldaColumna15 >=1) { tabla.rows[i].cells[15].style.backgroundColor = "#9E42BE"; } '
    
         html += 'var valorCeldaColumna20 = tabla.rows[i].cells[20].innerHTML;  '
         html += 'var valorCeldaColumna19 = tabla.rows[i].cells[19].innerHTML;   '
         html += 'if (valorCeldaColumna19 == 0 && valorCeldaColumna20 >=1) { tabla.rows[i].cells[20].style.backgroundColor = "#9E42BE"; } '
    
         html += 'var valorCeldaColumna25 = tabla.rows[i].cells[25].innerHTML;  '
         html += 'var valorCeldaColumna24 = tabla.rows[i].cells[24].innerHTML;   '
         html += 'if (valorCeldaColumna24 == 0 && valorCeldaColumna25 >=1) { tabla.rows[i].cells[25].style.backgroundColor = "#9E42BE"; } '
    
    
         html += 'var valorCeldaColumna30 = tabla.rows[i].cells[30].innerHTML;  '
         html += 'var valorCeldaColumna29 = tabla.rows[i].cells[29].innerHTML;  '
         html += 'if (valorCeldaColumna29 == 0 && valorCeldaColumna30 >=1) { tabla.rows[i].cells[30].style.backgroundColor = "#9E42BE"; } '
         
         html += 'var valorCeldaColumna35= tabla.rows[i].cells[35].innerHTML;  '
         html += 'var valorCeldaColumna34 = tabla.rows[i].cells[34].innerHTML;   '
         html += 'if (valorCeldaColumna34 == 0 && valorCeldaColumna35 >=1) { tabla.rows[i].cells[35].style.backgroundColor = "#9E42BE"; } '
    
         html += 'var valorCeldaColumna40= tabla.rows[i].cells[40].innerHTML;  '
         html += 'var valorCeldaColumna39 = tabla.rows[i].cells[39].innerHTML; '
       
         html += 'if (valorCeldaColumna39 == 0 && valorCeldaColumna40 >=1) { tabla.rows[i].cells[40].style.backgroundColor = "#9E42BE"; } '
    
     html += '}';
      html += '}';
    
    
       html+="$('#resultsTable2 tr').each(function() {"
            html+="$(this).find('td:eq(7), th:eq(7)').hide(); "
            html+="$(this).find('td:eq(12), th:eq(12)').hide(); "
            html+="$(this).find('td:eq(17), th:eq(17)').hide(); "
            html+="$(this).find('td:eq(22), th:eq(22)').hide(); "
            html+="$(this).find('td:eq(27), th:eq(27)').hide(); "
            html+="$(this).find('td:eq(32), th:eq(32)').hide(); "
            html+="$(this).find('td:eq(37), th:eq(37)').hide(); "
            html+="$(this).find('td:eq(42), th:eq(42)').hide(); "
        html+="});"
    
    
    
    
      //Defino los totales de mis 2 columnas en 0 venta_total
    
      html+="var total_col1 = 0;"
      html+="var total_col2 = 0;"
      //Recorro todos los tr ubicados en el tbody
      html+="$('#resultsTable2 tbody').find('tr').each(function (i, el) {"
                 
            //Voy incrementando las variables segun la fila ( .eq(0) representa la fila 1 )     
           html+=" total_col1 += parseFloat($(this).find('td').eq(3).text());"
              html+=" total_col2+= parseFloat($(this).find('td').eq(42).text());"
                    
        html+="});"
    
         html+='var total_col2=total_col2.toLocaleString("en-US", { style: "currency", currency: "USD" });'
        //Muestro el resultado en el th correspondiente a la columna
        html+="$('#Piezas_total').val('venta total en piezas '+ total_col1 );"
        html+="$('#venta_total').val('venta total  '+ total_col2 );"
    
    
       html += "$('#resultsTable2 td').each(function() {"
            html += " var text = $(this).text();"
             html += "var newText = '';"
    
             html += "for (var i = 0; i < text.length; i += 15) {"
                html += " newText += text.slice(i, i + 15) + '<br>';"
             html += "}"
    
             html += "$(this).html(newText);"
         html += "});"
    

      html += '</script>';                                             
    return html;
  }

  function contarDomingos(fechaInicio, fechaFinal){
      var FF=fechaInicio
          var FF_Ini    = FF.split("/");
          var pocicion2=FF[0]
              var pocicion3=FF[1]
                  
                      var pocicion5=FF[3]
                          var pocicion6=FF[4]
                              var pocicion8=FF[6]
                          var pocicion9=FF[7]
                            var pocicion10=FF[8]
                          var pocicion11=FF[9]
                          var FFN=fechaFinal

  var FFin=FFN.split("/");
        var pocicion2_f=FFin[0] //09
              var pocicion3_f=FFin[1]//10
                  
                      var pocicion5_f=FFin[2]//2023
                          var pocicion6_f=FFin[4]
                              var pocicion8_f=FFin[6]
                          var pocicion9_f=FFin[7]
                            var pocicion10_f=FFin[8]
                          var pocicion11_f=FFin[9]




  var fechaInicio   = fechaInicio.split("/");
    var fechaFinal    = fechaFinal.split("/");
    //var fechaInicio_s = new Date(fechaInicio[2], parseInt(fechaInicio[1] - 1), parseInt(fechaInicio[0]));
    //ar fechaFinal_s = new Date(fechaFinal[2], parseInt(fechaFinal[1] - 1), parseInt(fechaFinal[0]));

var FF_Ini22 = new Date(FF_Ini[2], FF_Ini[1]-1, FF_Ini[0]);
var FFin22 = new Date(FFin[2], FFin[1]-1, FFin[0]);   

    var contDomingos  = 0;
    while(FFin22 >= FF_Ini22){
      if (FF_Ini22.getDay() == 0) { // Es domingo
        contDomingos++;
      }
      FF_Ini22.setDate(FF_Ini22.getDate() + 1);
    }

    return contDomingos;
  }
    function Dias_diferencia(fechaInicio, fechaFinal){
      var FF=fechaInicio
          var FF_Ini    = FF.split("/");
          var pocicion2=FF[0]
              var pocicion3=FF[1]
                  
                      var pocicion5=FF[3]
                          var pocicion6=FF[4]
                              var pocicion8=FF[6]
                          var pocicion9=FF[7]
                            var pocicion10=FF[8]
                          var pocicion11=FF[9]
                          var FFN=fechaFinal

  var FFin=FFN.split("/");
        var pocicion2_f=FFin[0] //09
              var pocicion3_f=FFin[1]//10
                  
                      var pocicion5_f=FFin[2]//2023
                          var pocicion6_f=FFin[4]
                              var pocicion8_f=FFin[6]
                          var pocicion9_f=FFin[7]
                            var pocicion10_f=FFin[8]
                          var pocicion11_f=FFin[9]




  var fechaInicio   = fechaInicio.split("/");
    var fechaFinal    = fechaFinal.split("/");
    //var fechaInicio_s = new Date(fechaInicio[2], parseInt(fechaInicio[1] - 1), parseInt(fechaInicio[0]));
    //ar fechaFinal_s = new Date(fechaFinal[2], parseInt(fechaFinal[1] - 1), parseInt(fechaFinal[0]));

var FF_Ini22 = new Date(FF_Ini[2], FF_Ini[1]-1, FF_Ini[0]).getTime();
var FFin22 = new Date(FFin[2], FFin[1]-1, FFin[0]).getTime();   

var dias = FFin22 - FF_Ini22;

var diferencia=dias/(2000*60*60*24);

  return diferencia;
}
  return {
    onRequest: onRequest
  }
});
