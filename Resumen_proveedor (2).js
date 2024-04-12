/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 *
 */

define(['N/query', 'N/log', 'N/ui/serverWidget', 'N/runtime'], function(query, log, serverWidget, runtime){

  function onRequest(context){

        var delimiter     = /\u0005/;


      
          var location        = context.request.method == 'POST' ? context.request.parameters.custpage_loc : "";

          
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
      title: 'Resumen Proveedores ',
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
    form.clientScriptModulePath = './Actualiza_Objetivos.js';  
    form.addSubmitButton( { label: 'Generar Reporte' } );


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



  
//cambio de sublinea de seleccion a multi seleccion






/*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 04/07/2023-----------------------*/






 var location11 = form.addField({
      id: "custpage_loc",
      type: serverWidget.FieldType.SELECT,
      label: "Sucursal",
      source: "location",
      container: 'grupofiltros'
    }).setHelpText({ help: "Obtener El marca" });
    location11.isMandatory = false;
    location11.defaultValue = location;
/*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 04/07/2023-----------------------*/





    if (context.request.method == 'POST') {

     
    innerHtml = "";


  _fec_ini="11/01/2023"
fec_fin="11/30/2023"
var locationparastock=0;
if(location==""){
  location="2,4,5,6,1,3,23";
  locationparastock="2,4,5,6,1,3,23,25 ,26,12,32,21";
}
else if (location==0){"2,4,5,6,1,3,23"}
else{locationparastock=location}

      /** SQL principal */


   var dias1432 =Dias_diferencia(f_Inicio, f_Final);
            var dias143222 =contarDomingos(f_Inicio, f_Final);
      var ff111=Dias_diferencia(f_Inicio, f_Final);
          var valor_dedia=0
    if(dias1432==0){
      valor_dedia=1
    }else(
valor_dedia=((dias1432*2)+2)-dias143222
      )

      var sqlPrincipal2 =    "SELECT t1.name as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad\
      FROM(\
          SELECT CASE WHEN CUSTOMRECORD671.name IS NULL OR CUSTOMRECORD671.name='' THEN 'Sin proveedor' ELSE CUSTOMRECORD671.name END as name,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta, SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >='"+f_Inicio+"' AND SalesOrder.TranDate <='"+f_Final+"') AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY CASE WHEN CUSTOMRECORD671.name IS NULL OR CUSTOMRECORD671.name='' THEN 'Sin proveedor' ELSE CUSTOMRECORD671.name END \
      )t1 FULL OUTER JOIN\
      (\
          SELECT CASE WHEN CUSTOMRECORD671.name IS NULL OR CUSTOMRECORD671.name='' THEN 'Sin proveedor' ELSE CUSTOMRECORD671.name END as name, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >='"+f_Inicio+"' AND SalesOrder.TranDate <='"+f_Final+"' ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY CASE WHEN CUSTOMRECORD671.name IS NULL OR CUSTOMRECORD671.name='' THEN 'Sin proveedor' ELSE CUSTOMRECORD671.name END\
      )t2 ON t1.name=t2.name" 
///cons3.cantidad_disponible / (cons3.cantidad_vendida /NULLIF(" + Math.round(valor_dedia) + ", 0))



var sqlPrincipal="select*,COALESCE(ROUND(stock_en_piezas /  NULLIF(venta_en_piezas /NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0) dias_de_existencia,COALESCE(ROUND(stock_en_pesos /  NULLIF(venta_en_pesos /NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0) , 0) dias_de_existencia_en_pesos from(select  case  when c1.articulo is null  then'Sin proveedor' else c1.articulo end      proveedor , "+
"case  when round(c2.cam) is null  then 0 else round(c2.cam) end + case  when round(descuento.cantidad) is null  then 0 else round(descuento.cantidad) end     venta_en_piezas ,case  when c2.venta is null  then 0 else c2.venta end venta_en_pesos,case  when  round(c1.stock_disponible) is null  then 0 else  round(c1.stock_disponible) end stock_en_piezas,case  when  round(c1.valor_de_stock) is null  then 0 else  round(c1.valor_de_stock) end stock_en_pesos  , "+
" "+

" from (select  CASE WHEN articulo IS NULL OR articulo='' THEN 'Sin proveedor' ELSE articulo END as articulo  ,sum(stock_disponible)  stock_disponible,sum(valor_de_stock) valor_de_stock from(select consulta_1.articulo , consulta_1.stock_disponible ,consulta_1.valor_de_stock from (SELECT t3.codigo, " +
"         ( " +
"     CASE " +
"     WHEN t3.articulo IS NULL THEN " +
"     '' " +
"     ELSE t3.articulo END) AS articulo,SUM(NVL(t1.ene,0)+ " +
"     CASE t2.articulo " +
"     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN " +
"     0 " +
"     ELSE NVL(t2.ene,0) END) AS cantidad,SUM( " +
"     CASE " +
"     WHEN t3.stock_disponible IS NULL THEN " +
"     0 " +
"     ELSE t3.stock_disponible " +
"     END ) AS stock_disponible,( " +
"     CASE " +
"     WHEN t3.valor_de_stock IS NULL THEN " +
"     0 " +
"     ELSE t3.valor_de_stock END) AS valor_de_stock, " +
"         SUM(NVL( t1.eneVentaNeta, " +
"         0)+NVL( t2.eneventanetas, " +
"         0 ) + NVL(t2.eneventanet, " +
"         0)) AS venta FROM(							SELECT Ubicacion.id AS sucursalid, " +
"         Ubicacion.fullname, " +
"         SUM( SOLine.quantity )*-1 AS Ene, " +
"         SUM(  " +
"     CASE " +
"     WHEN SalesOrder.terms=20 " +
"         AND SOLine.item=item.id THEN " +
"     SOLine.netamount " +
"     WHEN SalesOrder.terms=4 " +
"         AND SOLine.item=item.id THEN " +
"     SOLine.netamount " +
"     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.itemid AS articulo, " +
"     FROM TransactiON AS SalesOrder " +
" INNER JOIN TransactionLine AS SOLine " +
"     ON ( SOLine.TransactiON = SalesOrder.ID ) " +
"         AND ( SOLine.MainLine = 'F' ) " + 
" INNER JOIN locatiON AS Ubicacion " +
"     ON ( SOLine.location= Ubicacion.id ) " +
" INNER JOIN Item " +
"     ON ( Item.ID = SOLine.Item ) " +
"     WHERE ( SalesOrder.Type = 'CustInvc' ) " +
"         AND ( SalesOrder.TranDate  >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') " +
"         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) " +
"         AND ( SalesOrder.Void = 'F' ) " +
"         AND ( SalesOrder.Voided = 'F' ) " +
"         AND ( Item.ItemType <> 'Discount' ) " +
"         AND ( Item.ItemType != 'Service' ) " +
"         AND ( Item.ItemType != 'Assembly' ) " +
"         AND ( Item.id!=25311 ) " +
"         AND ( Ubicacion.id IN ("+locationparastock+") ) " +
"     GROUP BY  Ubicacion.fullname, " +
"         item.itemid, " +
"         Ubicacion.id)t1 						FULL OUTER JOIN(							SELECT Ubicacion.id AS sucursalid, " +
"         Ubicacion.fullname AS fullnames, " +
"         SUM( SOLine.quantity )*-1 AS Ene, " +
"         SUM( " +
"     CASE " +
"     WHEN SalesOrder.custbody_bex_tiponc=1 " +
"         AND SOLine.item=item.id THEN " +
"     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  " +
"     CASE " +
"     WHEN SalesOrder.custbody_bex_tiponc=3 " +
"         AND SOLine.item=item.id " +
"         AND Item.id!=19012 THEN " +
"     (SOLine.netamount * -1) " +
"     ELSE 0 END) AS eneventanetas,	item.itemid AS articulo,FROM TransactiON AS SalesOrder " +
" INNER JOIN TransactionLine AS SOLine " +
"     ON ( SOLine.TransactiON = SalesOrder.ID ) " +
"         AND ( SOLine.MainLine = 'F' ) " +
" INNER JOIN locatiON AS Ubicacion " +
"     ON ( SOLine.location= Ubicacion.id ) " +
" INNER JOIN Item " +
"     ON ( Item.ID = SOLine.Item ) " +
" LEFT JOIN CUSTOMLIST224 AS clasificacion " +
"     ON item.custitem4 = clasificacion.id " +
" LEFT JOIN CUSTOMRECORD681 " +
"     ON item.custitem15 = CUSTOMRECORD681.id " +
"     WHERE ( SalesOrder.Type ='CustCred') " +
"         AND ( SalesOrder.TranDate  >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') " +
"         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) " +
"         AND ( SalesOrder.Void = 'F' ) " +
"         AND ( SalesOrder.Voided = 'F' ) " +
"         AND ( Item.ItemType <> 'Discount' ) " +
"         AND ( Item.ItemType != 'Assembly' ) " +
"         AND ( Item.id!=25311 ) " +
"         AND ( SalesOrder.custbody_bex_tiponc=1 " +
"         OR SalesOrder.custbody_bex_tiponc=3) " +
"         AND ( Ubicacion.id IN ("+locationparastock+") ) " +
"     GROUP BY  Ubicacion.fullname,item.itemid, Ubicacion.id)t2 " +
"     ON t2.articulo=t1.articulo 						FULL OUTER JOIN	(							SELECT sucursal, " +
"         articulo, " +
"         sucursalid, " +
"         sum(Stock_disponible) AS Stock_disponible, " +
"         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, " +
"         codigo " +
"     FROM (SELECT articulo.displayname AS codigo, " +
"        NCP.name AS articulo, " +
"         (ubicacion_inventario.location) AS sucursalid, " +
"         ubicacion.fullname AS sucursal, " +
"         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, " +
"         ubicacion_inventario.averagecostmli AS valor_de_stock, " +
"          " +
"     FROM item AS articulo " +
" JOIN inventoryitemlocations AS ubicacion_inventario " +
"     ON articulo.id =ubicacion_inventario.item " +
" JOIN locatiON AS ubicacion " +
"     ON ubicacion.id=ubicacion_inventario.location " +
"  left JOIN CUSTOMRECORD671 NCP on  articulo.custitem10=NCP.id "+
"     WHERE ubicacion_inventario.locatiON IN ("+locationparastock+") ) " +
"     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 " +
"     ON t3.articulo=t1.articulo 						WHERE (( " +
"     CASE " +
"     WHEN t3.valor_de_stock IS NULL THEN " +
"     0 " +
"     ELSE t3.valor_de_stock END)!=0 " +
"         OR (NVL(t1.ene,0)+ " +
"     CASE t2.articulo " +
"     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN " +
"     0 " +
"     ELSE NVL(t2.ene,0) END)!=0 " +
"         OR ( " +
"     CASE " +
"     WHEN t3.stock_disponible IS NULL THEN " +
"     0 " +
"     ELSE t3.stock_disponible " +
"     END )!=0 " +
"         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) " +
"     GROUP BY  t3.sucursal,t3.articulo ,t3.valor_de_stock,t3.codigo )consulta_1 )  group by articulo)  c1 FULL OUTER JOIN  " +




      "(SELECT t1.name as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,cam \
      FROM(\
          SELECT CASE WHEN CUSTOMRECORD671.name IS NULL OR CUSTOMRECORD671.name='' THEN 'Sin proveedor' ELSE CUSTOMRECORD671.name END as name,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta, SUM(quantity)*-1 as cam, SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >='"+f_Inicio+"' AND SalesOrder.TranDate <='"+f_Final+"') AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY CASE WHEN CUSTOMRECORD671.name IS NULL OR CUSTOMRECORD671.name='' THEN 'Sin proveedor' ELSE CUSTOMRECORD671.name END \
      )t1 FULL OUTER JOIN\
      (\
          SELECT CASE WHEN CUSTOMRECORD671.name IS NULL OR CUSTOMRECORD671.name='' THEN 'Sin proveedor' ELSE CUSTOMRECORD671.name END as name, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >='"+f_Inicio+"' AND SalesOrder.TranDate <='"+f_Final+"' ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY CASE WHEN CUSTOMRECORD671.name IS NULL OR CUSTOMRECORD671.name='' THEN 'Sin proveedor' ELSE CUSTOMRECORD671.name END\
      )t2 ON t1.name=t2.name )  c2 on  c1.articulo=c2.articulo    left join " +

  " (SELECT  SUM(quantity)*-1 cantidad ,CUSTOMRECORD671.name proveedor   "+ 
" FROM transaction "+
" JOIN transactionline "+
" ON transactionline.transaction=transaction.id "+
" JOIN item "+
" ON transactionline.item=item .id "+
" left join CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id "+
" WHERE  " +
"      transactionline.itemtype='InvtPart' "+
"     AND transactiON .tranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
"     AND transactiON .tranDate  <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
"     AND transactionline.location in ("+location+")  "+
"     AND transactiON .type IN ('CustCred') GROUP BY  CUSTOMRECORD671.name)descuento   on  c1.articulo=descuento.proveedor )"
"  "
///////////filtro 13
/*falta Proveedor y zona*/

      log.audit({title:"query", details:sqlPrincipal  });
    
      
      do {
        var suiteQL     = "SELECT * FROM ( SELECT ROWNUM AS ROWNUMBER, * FROM ("+ sqlPrincipal +" ) ) WHERE (ROWNUMBER BETWEEN " + noRowInicio + " AND " + noRowFinal + ")";
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

    innerHtml = "";

 
    innerHtml = "";

    var dias1432 =Dias_diferencia(f_Inicio, f_Final);
    var dias143222 =contarDomingos(f_Inicio, f_Final);
var ff111=Dias_diferencia(f_Inicio, f_Final);
  var valor_dedia=0
if(dias1432==0){
valor_dedia=1
}else(
valor_dedia=((dias1432*2)+2)-dias143222
)

         
      

    innerHtml+= ' <br/> <br/><input type="text" class="form-control" value="'+parseInt(valor_dedia)+' días" readonly><br/> <br/><table style="table-layout: fixed; width: 300%; border-spacing: 6px;">';
 
    innerHtml+= '<tr>';
    innerHtml+= '<td>';
   
        innerHtml+= '  <br/><br/> <div class="row">';
    innerHtml+= ' <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 text-left">';
    innerHtml+= '   <table class="display nowrap table table-sm table-bordered table-hover table-responsive-sm" id="resultsTable"> ';
    if ( records.length > 0 ) {

      var columnNames = Object.keys( records[0] );
      innerHtml+= '     <thead class="thead-light">';
      innerHtml+= '       <tr>';
      for ( i = 1; i < columnNames.length; i++ ) {
    


        innerHtml+= '     <th class="text-right text-uppercase"><H3>'+columnNames[i]+'</H3></th>';
      }
 
   
       
 
      innerHtml+= '       </tr>';
      innerHtml+= '     </thead>';
      innerHtml+= '     <tbody id="apptable">';
      // Add the records to the sublist...
      for ( r = 0; r < records.length; r++ ) {
               var vo =0;
                var vo_dia =0;
                   var vr =0;
                   var Porcent_venta =0;
                    var utilidad_objetivo =0;
                     var utilidad_objetivo_dia =0;
                     var compra =0;
                     var utilidad_real=0;
                       var porcentaje_utilidad=0;
                       var objetivo_margen=0;
                       var margen_real=0;
                        var   vesteac=0;
var pendiente_recibir = 0;
    var stock = 0;
           
               var cant_vta_pz=0;
               var vt2=0;
               var cant_vta_pz=0;
            var venta=0;

 var valor_de_stock =0;


                    var venta_net_client=0;
               var  utilidad=0;
               var fecha="";
  var stock_disponible=0;
  
 
var venta=0;

var valor_de_stock =0;
        innerHtml+= '     <tr>';
        var record = records[r];
        for ( c = 1; c < columnNames.length; c++ ) {

          // Nombre de la columna
          var column = columnNames[c];
          var value = record[column];
         var v2022 =0;
  var venta_2021 =0;

 
var tot_vtas=0;
var tot_vtas_op=0;
var tot_vtas_op2=0;
var cost=0;
var tot_vtas_op22=0

var Prec_Promedio=0;
var Prec_Promedioq=0;
var margen=0




           
    if (column.indexOf("venta") !== -1)
    venta = parseFloat(value)

            if (column.indexOf("valor_de_stock") !== -1)
            valor_de_stock = parseFloat(value)
          
            es_numero = c >= 8 && !isNaN(value) ? true : false;
            innerHtml += '    <td class="text-right  ">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
          

      
        }


  
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
      innerHtml+= '     <tbody id="apptable2">';
      innerHtml+= '     </tbody>';
    }
         innerHtml+= ' <tfoot id="ttf">'

    innerHtml+= ' </tfoot>'
    innerHtml+= '   </table>';

                                                                                                        innerHtml+= '  <table class="table table-striped" id="tabla2"><tfoot id="ttf2"></tfoot></table>'
       innerHtml+= '</div>';
    innerHtml+= '</div>';
        innerHtml+= '  <br/><br/> <div class="row">';
    innerHtml+= ' <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 text-center">';


       innerHtml+= '</div>';   innerHtml+= '</div>';

      innerHtml+= '</div>';
    innerHtml+= '</div>';
    innerHtml+= '</td>';
    innerHtml+= '</tr>';
    innerHtml+= '</table>';

          innerHtml+= '<textarea>'+sqlPrincipal+'</textarea> <div class="row ">';
    
        innerHtml+= ' <div class="col-md-8 col-lg-8 col-sm-8 col-xs-8 text-left">';
      
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
    htmlField.defaultValue = generadorHtml(innerHtml, records.length,f_Inicio ,f_Final,location);

 
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



  //////////////77
   

  ///aqui
    

  function generadorHtml(table, records,f_Inicio ,f_Final,sucursal){
    var dias1432 =Dias_diferencia(f_Inicio, f_Final);
    var dias143222 =contarDomingos(f_Inicio, f_Final);
var ff111=Dias_diferencia(f_Inicio, f_Final);
  var valor_dedia=0
if(dias1432==0){
valor_dedia=1
}else(
valor_dedia=((dias1432*2)+2)-dias143222
)

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
      html += '<script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.53/build/vfs_fonts.js"></script>';
      html += '<script src="https://cdn.datatables.net/buttons/1.6.2/js/buttons.flash.min.js"></script>';
      html += '<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>';

      html += '<style type = "text/css">'

      html += ' td, th {';
      html += '   font-size: 10pt;';
      html += '   border: 3px;';
      html += ' }'

      html += ' th {'
      html += '   text-transform: lowercase;';
      html += '   font-weight: bold;';
      html += ' }';

      html += ' .dt-buttons{';
      html += '   margin-left:20px;';
      html += ' }';
     html += '.miEtiqueta {'
             html += ' background-color: #C8C9CA; /* Cambia esto al color deseado */'
      
         html += ' }'
            html += '.miEtiqueta2 {'
             html += ' background-color: #939596; /* Cambia esto al color deseado */'
      
         html += ' }'

         html += ' #resultsTable2{'
 html += 'font-size: 5px; '
 html += ''
 html += 'td{'
 html += 'font-size: 5px; '
 html += '}'

 html += 'th{'
 html += 'font-size: 5px; '
 html += '}'


  html += 'table {'
      html += 'border-collapse: collapse;'
      html += 'width: 100%;'
    html += '}'

   html += ' th, td {'
     html += ' border: 1px solid #dddddd;'
     html += ' text-align: left;'
     html += ' padding: 8px;'
   html += ' }'

   html += ' th {'
     html += ' background-color: #f2f2f2;'
    html += '}'

    html += '.detalles {'
     html += ' display: none;'
    html += '}'
      html += '</style>'
      html += table;

      html += '<script>';
      //////////
            html += ' $("#submitter").click(function(){$("#myModal").modal("show")});';

            html += ' $("#resultsTable").DataTable({';
html += records > 0 ? '   "order": [[2, "desc"]],' : '';
html += '   "pageLength": 500,';
html += '   "initComplete": function(){';
html += '     $("#resultsDiv").show(); ';

html += '   },';
html += '   "language": {"url":"https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"},';
html += '   "buttons": [';
html += '       { extend: "excel"';

html += '       }';
html += '   ],';
html += '   "dom":"lBpftip"';
html += ' });';
    
      ///////////
      html += "console.log('fue 12  ' + 12);"
      //
       html+="var col2 = 0;"
       html+="var col2_val = 0;"
       //
         //
       html+="var col3 = 0;"
       html+="var col3_val = 0;"
       //
         //
       html+="var col4 = 0;"
       html+="var col4_val = 0;"
       //
         //
       html+="var col5 = 0;"
       html+="var col5_val = 0;"
       //
         //
       html+="var col6 = 0;"
       html+="var col6_val = 0;"
       //
         //
       html+="var col7 = 0;"
       html+="var col7_val = 0;"
       //
         //
       html+="var col8 = 0;"
       html+="var col8_val = 0;"
       //
         //
       html+="var col9 = 0;"
       html+="var col9_val = 0;"
       //
         //
       html+="var col10 = 0;"
       html+="var col10_val = 0;"
       //
         //
       html+="var col11 = 0;"
       html+="var col11_val = 0;"
       //
         //
       html+="var col12 = 0;"
       html+="var col12_val = 0;"
       //
         //
       html+="var col13 = 0;"
       html+="var col13_val = 0;"
       //
         //
       html+="var col14 = 0;"
       html+="var col14_val = 0;"
       //
       html+="var nuevacol_1 = 0;"
       html+="var nuevacol_2 = 0;"


html+="var cont = 0;"

      html+="$('#resultsTable tbody').find('tr').each(function (i, el) {"
             
        //Voy incrementando las variables segun la fila ( .eq(0) representa la fila 1 )     
  

html+="col2_val+= parseFloat($(this).find('td').eq(1).text());"
html+="col3_val+= parseFloat($(this).find('td').eq(2).text());"
html+="col4_val+= parseFloat($(this).find('td').eq(3).text());"
html+="col5_val+= parseFloat($(this).find('td').eq(4).text());"

html+="nuevacol_1+= parseFloat($(this).find('td').eq(4).text());"
html+="nuevacol_2+= parseFloat($(this).find('td').eq(5).text());"

   html+=" cont= i;"

//
    html+=" if (isNaN(col2_val)) {"
        html+="col2+= 0;"
     html+="}"
      html+="else {"
         html+=" col2+= parseFloat($(this).find('td').eq(1).text());"
      html+=" }"
//
     //
    html+=" if (isNaN(col3_val)) {"
        html+="col3+= 0;"
     html+="}"
      html+="else {"
         html+=" col3+= parseFloat($(this).find('td').eq(2).text());"
      html+=" }"
//
     
     //
    html+=" if (isNaN(col4_val)) {"
        html+="col4+= 0;"
     html+="}"
      html+="else {"
         html+=" col4+= parseFloat($(this).find('td').eq(3).text());"
      html+=" }"
//
     
     //
    html+=" if (isNaN(col5_val)) {"
        html+="col5+= 0;"
     html+="}"
      html+="else {"
         html+=" col5+= parseFloat($(this).find('td').eq(4).text());"
      html+=" }"
//
     
     
  
      
    html+="});"


    html+="var dias ="+valor_dedia+"; var dias_Tot=col4/(col3/"+valor_dedia+"); console.log('dias ' +dias);"
    html+="var dias_Tot2=col4/(col2/"+valor_dedia+");"
    html+="var dias_Tot=col5/(col3/"+valor_dedia+");"
  

 /*  8 entte 6
<td  class="precio">`+col2+` </td><td  class="precio">`+col3+` </td><td  class="precio">`+col4+` </td><td  class="precio">`+col5+` </td><td  class="precio">`+col6+` </td><td  class="precio">`+col7+` </td><td  class="precio">`+col8+` </td><td  class="precio">`+col9+` </td><td  class="precio">`+col10+` </td><td  class="precio">`+col11+` </td><td  class="precio">`+col12+` </td><td  class="precio">`+col13+` </td><td  class="precio">`+col14+` </td>
*/

html += '$("#ttf").append( `<tr><td  >Total de Proveedores `+cont+`</td><td  class=" text-right numero">`+parseInt(col2)+` </td> <td  class=" text-right precio">`+col3+` </td><td  class=" text-right  ">`+parseInt(col4)+` </td><td class=" text-right  precio">`+col5.toFixed(2)+` </td><td class=" text-right  ">`+parseInt(dias_Tot2)+` </td><td class=" text-right  ">`+parseInt(dias_Tot)+` </td> </tr>` ); '; 





 html += '  var indiceColumna = 1; '
 html += '  var indiceColumna5 = 2; '
  html += '  var indiceColumna6 = 3; '
   html += '  var indiceColumna7 = 4; '
      
  html += "      $('#resultsTable tbody tr').each(function(){"
    
            html += "     $(this).find('td').eq(indiceColumna5).addClass('precio'); "
              html += "     $(this).find('td').eq(indiceColumna7).addClass('precio'); "
  html += '      });'

  html += 'var precios = document.querySelectorAll(".precio");';
 html += ' precios.forEach(function(precio) {';
   html += ' var valor = parseFloat(precio.textContent);';
       html += ' if (isNaN(valor)) { '
      html += '  precio.textContent = precio.textContent;';
        html += ' } else { '
      html += '  precio.textContent = valor.toLocaleString("en-US", { style: "currency", currency: "USD" });';
         html += '} '






  html += '});';
  html += '$(document).ready(function() {'
  html += 'function formatearNumero(numero) {'
        
    html += '  var partes = numero.toString().split(".");'
 
    html += ' partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");'
    
    
    html += '  return partes.join(".");}'
  
  
  
  html += ' var numeroSinFormato = $("#numero").text(); '
  
  
  html += ' var numeroFormateado = formatearNumero(numeroSinFormato);'
  html += ' $("#numero").text(numeroFormateado);'
  html += ' var numeroSinFormato2 = $("#numero2").text(); '
  html += ' var numeroFormateado2 = formatearNumero(numeroSinFormato2);'
  html += ' $("#numero2").text(numeroFormateado2);  });'

        html += '</script>';
    return html;
  }

  function contarDomingos(fechaInicio, fechaFinal){
    var fechaInicio   = fechaInicio.split("/");
    var fechaFinal    = fechaFinal.split("/");
    



    var anio        = fechaFinal[2];
    var mes         = fechaFinal[1];
    var dia         = fechaFinal[0];

    var anio_ini        = fechaInicio[2];
    var mes_ini         = fechaInicio[1];
    var dia_ini         = fechaInicio[0];

if(dia_ini==8){dia_ini=7}
if(dia_ini==9){dia_ini=7}
    var fechaFinal_s = new Date(anio, parseInt(mes - 1), parseInt(dia));


    var fechaInicio_s = new Date(anio_ini, parseInt(mes_ini - 1), parseInt(dia_ini));


    var contDomingos  = 0;
    while(fechaFinal_s >= fechaInicio_s){
      if (fechaInicio_s.getDay() == 0) { // Es domingo
        contDomingos++;
      }
      fechaInicio_s.setDate(fechaInicio_s.getDate() + 1);
    }

    if(mes_ini==3){
      return contDomingos+2;
    }
    else{
    return contDomingos;
    }
  }

  ///_________crea peudido

       //
  ///__________crea_pedido
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
