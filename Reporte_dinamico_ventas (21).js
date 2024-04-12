/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 *
 */

define(['N/query', 'N/log', 'N/ui/serverWidget', 'N/runtime'], function(query, log, serverWidget, runtime){

    function onRequest(context){
  
          var delimiter     = /\u0005/;
  
  
         var customrecord688        = context.request.method == 'POST' ? context.request.parameters.custpage_customrecormes : "";
            var location        = context.request.method == 'POST' ? context.request.parameters.custpage_loc : "";
  
              var customrecord689        = context.request.method == 'POST' ? context.request.parameters.custpage_anio : "";
         var Clasificacion2 = context.request.method == 'POST' ? context.request.parameters.custpage_casificacion1 : "";
    var proov2 = context.request.method == 'POST' ? context.request.parameters.custpage_proov : "";
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
        title: 'Reporte Dinamico de ventas(all in one)',
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
  
  
   var customrecord6881 = form.addField({
        id: "custpage_customrecormes",
        type: serverWidget.FieldType.SELECT,
        label: "Filtras Por :",
        source: "customrecord688",
        container: 'grupofiltros'
      }).setHelpText({ help: "Obtener El marca" });
      customrecord6881.isMandatory = false;
      customrecord6881.defaultValue = customrecord688;
  
  
  
  
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
  
  

  
  
    var Clasificacion1 = form.addField({
        id: "custpage_casificacion1",
        type: serverWidget.FieldType.SELECT,
        label: "Clasificacion",
        source: "customrecord683",
        container: 'grupofiltros'
      }).setHelpText({ help: "Obtener El marca" });
      Clasificacion1.isMandatory = false;
      Clasificacion1.defaultValue = Clasificacion2;
  
  
  
  
    var proov1 = form.addField({
        id: "custpage_proov",
        type: serverWidget.FieldType.SELECT,
        label: "Proveedor",
        source: "CUSTOMRECORD671",
        container: 'grupofiltros'
      }).setHelpText({ help: "Obtener El marca" });
      proov1.isMandatory = false;
      proov1.defaultValue = proov2;
  
      if (context.request.method == 'POST') {
  
  var valproov2=parseInt(proov2)
  
   if (isNaN(valproov2)){valproov2=0}
  
       
      innerHtml = "";
  
  
    _fec_ini="11/01/2023"
  fec_fin="11/30/2023"
  
  if(location==""){
    location="2,4,5,6,1,3,23";
  }
  else if (location==0){"2,4,5,6,1,3,23"}

        /** SQL principal */
  if(customrecord688==1){
    var sqlPrincipal= "  select*, from( select consulta2023.* ,((consulta2023.Venta_neta-CostoTotal)+CostoTotal2)-271350.8 Utilidad from (select  fullname Sucursal,(total_ingresos-(valor_1_para__el_5+valor_2_para__el_5))-(DEVOLUCIONES+COALESCE(prec_pactado,0)  ) Venta_neta  from (SELECT    "+
  "  sum(netamount)*-1 total_Ingresos , transactionline.location loc "+
  "  FROM     "+
  "    transaction join transactionline on transactionline.transaction=transaction.id   "+
  
  "      where   itemtype='InvtPart'     "+
  "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')     AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')     "+
  "    and transactionline.location in ("+location+") and transaction .type='SalesOrd' group by  transactionline.location)  as total_Ingresos left  join  "+
  
  "    (select    "+
  "   sum(netamount)*-1 valor_1_para__el_5  , transactionline.location loc  "+
  "  FROM     "+
  "   transaction join transactionline on transactionline.transaction=transaction.id    where   itemtype='InvtPart'    "+
  "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')     AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')    and transactionline.location in ("+location+")     "+
  "    and transaction .type='SalesOrd'  and terms not  in(4,20 ) group by  transactionline.location)  valor_1_para__el_5  on  total_Ingresos .loc=valor_1_para__el_5  .loc left    join  "+
  "   (select    "+
  "   sum(netamount)*.95 valor_2_para__el_5, transactionline.location loc  "+
  "  FROM     "+
  "   transaction join transactionline on transactionline.transaction=transaction.id    where   itemtype='InvtPart'    "+
  "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')     AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')    and transactionline.location in ("+location+")     "+
  "    and transaction .type='SalesOrd'  and terms not  in(4,20 ) group by  transactionline.location ) as valor_2_para__el_5 on total_Ingresos .loc= valor_2_para__el_5.loc    left    join  "+
  "(SELECT     "+
  "  sum(netamount)  DEVOLUCIONES, transactionline.location loc  "+
  "  FROM    "+
  "   transaction join transactionline on transactionline.transaction=transaction.id    where   itemtype='InvtPart'     "+
  "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')     AND     "+
  "  transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') and transactionline.location in ("+location+") and transaction .type in ('CustCred') group by  transactionline.location) As  DEVOLUCIONES "+
  
  "on total_Ingresos .loc= DEVOLUCIONES.loc   left join  "+
  
  "(SELECT     "+
  "  sum(netamount) prec_pactado, transactionline.location loc  "+
  "  FROM    "+
  "   transaction join transactionline on transactionline.transaction=transaction.id    where   transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')     AND     "+
  "  transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') and transactionline.location in ("+location+") and transaction .type in ('CustCred')  and  custbody_bex_tiponc  in (1)      "+
  "  and transactionline.item = 19012    "+
  "  group by  transactionline.location) as prec_pactado "+
  "on total_Ingresos .loc= prec_pactado.loc  "+
  "left join  location on  total_Ingresos .loc=location.id) consulta2023  left join  " +
  
  
  
  
  
  "  (Select ROUND(sum(CostoTotal),2)*-1 CostoTotal,loc loc  from   "+
  " (SELECT      "+
  " ROUND(quantity,2)* ROUND(costestimaterate,2)  CostoTotal, location.fullname loc   "+
  "   FROM     "+
  "    transaction join transactionline on transactionline.transaction=transaction.id  "+
  " left join  location on  transactionline.location=location.id  "+
   " where   itemtype='InvtPart'      "+
  "     AND transaction .tranDate >TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')       AND      "+
  "   transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   and transactionline.location in ("+location+") and "+
  " transaction .type in ('SalesOrd') )group by loc ) as  CostoTotal  on consulta2023 .Sucursal = CostoTotal .loc   left join  "+
  
  
  "  (Select ROUND(sum(CostoTotal2),2) CostoTotal2,loc loc  from   "+
  " (SELECT      "+
  " ROUND(quantity,2)* ROUND(costestimaterate,2)  CostoTotal2, location.fullname loc   "+
  "   FROM     "+
  "    transaction join transactionline on transactionline.transaction=transaction.id  "+
  " left join  location on  transactionline.location=location.id  "+
   " where   itemtype='InvtPart'      "+
  "     AND transaction .tranDate >TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')       AND      "+
  "   transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   and transactionline.location in ("+location+") and "+
  " transaction .type in ('CustCred') )group by loc ) as  CostoTotal2  on consulta2023 .Sucursal = CostoTotal2 .loc    ) "
  
  
  
  }

  
  if(customrecord688==5){
    sqlPrincipal= 
    " SELECT *from(SELECT  "+
    "  item_conlt_prim.*from(select*from(SELECT articulo vendedor, "+
  
    "     venta_neta, "+
    "     cantidad, "+
    "     ROUND(Utilidad, "+
    "     0) utilidad_en_Pesos, "+
    "     ROUND(Utilidad, "+
    "     0) utilidad_en_PS, "+
    "     Round((Utilidad/venta_neta)*100) utilidad_porcentaje "+
    " FROM (SELECT total_Ingresos.DESC articulo, "+
    "     total_Ingresos.cantidad*-1 cantidad , "+
    "     (COALESCE(total_ingresos, "+
    "     0)-(COALESCE(valor_1_para__el_5, "+
    "     0)+COALESCE(valor_2_para__el_5, "+
    "     0)))-(COALESCE(DEVOLUCIONES, "+
    "     0) ) Venta_neta, "+
    "     ((COALESCE(total_ingresos, "+
    "     0)-(COALESCE(valor_1_para__el_5, "+
    "     0)+COALESCE(valor_2_para__el_5, "+
    "     0)))-(COALESCE(DEVOLUCIONES, "+
    "     0) ) -CostoTotal)+ COALESCE(DEVOLUCIONES_Compra, "+
    "     0) Utilidad , "+
    "     CostoTotal margen "+
    " FROM (SELECT sum(netamount)*-1 total_Ingresos , "+
    "     ROUND(sum(quantity), "+
    "     2) cantidad, "+
    "       transaction.custbodycustrecord_vendedor_msp itm, "+
    "        transaction.custbodycustrecord_vendedor_msp desc "+
    " FROM transaction "+
    " JOIN transactionline "+
    " ON transactionline.transaction=transaction.id "+
    " JOIN item "+
    " ON transactionline.item=item .id "+
    " WHERE    "+
    "     transactionline.itemtype='InvtPart' "+
    "     AND transactiON .tranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   "+
    "     AND transactiON .tranDate  <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  "+
    "     AND transactionline.location in ("+location+")  "+
    "     AND transactiON .type='SalesOrd' "+
    " GROUP BY    transaction.custbodycustrecord_vendedor_msp ) AS total_Ingresos "+
    " LEFT JOIN (SELECT sum(netamount)*-1 valor_1_para__el_5 , "+
    "       transaction.custbodycustrecord_vendedor_msp itm, "+
    "        transaction.custbodycustrecord_vendedor_msp desc "+
    " FROM transaction "+
    " JOIN transactionline "+
    " ON transactionline.transaction=transaction.id "+
    " JOIN item "+
    " ON transactionline.item=item .id "+
    " WHERE    "+
    "     transactionline.itemtype='InvtPart' "+
    "     AND transactiON .tranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   "+
    "     AND transactiON .tranDate  <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  "+
    "     AND transactionline.location in ("+location+")  "+
    "     AND transactiON .type='SalesOrd' "+
    "     AND terms NOT in(4,20 ) "+
    " GROUP BY    transaction.custbodycustrecord_vendedor_msp )AS valor_1_para__el_5 "+
    " ON total_Ingresos.itm=valor_1_para__el_5.itm "+
    " LEFT JOIN (SELECT sum(netamount)*.95 valor_2_para__el_5, "+
    "       transaction.custbodycustrecord_vendedor_msp itm, "+
    "        transaction.custbodycustrecord_vendedor_msp desc "+
    " FROM transaction "+
    " JOIN transactionline "+
    " ON transactionline.transaction=transaction.id "+
    " JOIN item "+
    " ON transactionline.item=item .id "+
    " WHERE    "+
    "     transactionline.itemtype='InvtPart' "+
    "     AND transactiON .tranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   "+
    "     AND transactiON .tranDate  <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  "+
    "     AND transactionline.location in ("+location+")  "+
    "     AND transactiON .type='SalesOrd' "+
    "     AND terms NOT in(4,20 ) "+
    " GROUP BY    transaction.custbodycustrecord_vendedor_msp )AS valor_2_para__el_5 "+
    " ON total_Ingresos.itm=valor_2_para__el_5.itm "+
    " LEFT JOIN (SELECT sum(netamount) DEVOLUCIONES, "+
    "       transaction.custbodycustrecord_vendedor_msp itm , "+
    "        transaction.custbodycustrecord_vendedor_msp desc "+
    " FROM transaction "+
    " JOIN transactionline "+
    " ON transactionline.transaction=transaction.id "+
    " JOIN item "+
    " ON transactionline.item=item .id "+
    " WHERE    "+
    "     transactionline.itemtype='InvtPart' "+
    "     AND transactiON .tranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   "+
    "     AND transactiON .tranDate  <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  "+
    "     AND transactionline.location in ("+location+")  "+
    "     AND transactiON .type IN ('CustCred') "+
    " GROUP BY    transaction.custbodycustrecord_vendedor_msp ) AS DEVOLUCIONES "+
    " ON total_Ingresos.itm=DEVOLUCIONES.itm "+
    " LEFT JOIN (SELECT ROUND(sum(CostoTotal), "+
    "     2)*-1 CostoTotal, "+
    "     DESC articulo, "+
    "     itm itm "+
    " FROM (SELECT ROUND(quantity, "+
    "     2)* ROUND(costestimaterate, "+
    "     2) CostoTotal, "+
    "       transaction.custbodycustrecord_vendedor_msp itm, "+
    "        transaction.custbodycustrecord_vendedor_msp desc "+
    " FROM transaction "+
    " JOIN transactionline "+
    " ON transactionline.transaction=transaction.id "+
    " JOIN item "+
    " ON transactionline.item=item .id "+
    " WHERE    "+
    "     transactionline.itemtype='InvtPart' "+
    "     AND transactiON .tranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')  "+
    "     AND transactiON .tranDate  <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  "+
    "     AND transactionline.location in ("+location+")  "+
    "     AND transactiON .type IN ('SalesOrd') ) "+
    " GROUP BY  desc,itm )AS CostoTotal "+
    " ON total_Ingresos.itm=CostoTotal.itm "+
    " LEFT JOIN (SELECT ROUND(sum(DEVOLUCIONES_Compra), "+
    "     2)*1 DEVOLUCIONES_Compra, "+
    "     DESC articulo, "+
    "     itm itm "+
    " FROM (SELECT ROUND(quantity, "+
    "     2)* ROUND(costestimaterate, "+
    "     2) DEVOLUCIONES_Compra, "+
    "       transaction.custbodycustrecord_vendedor_msp itm, "+
    "        transaction.custbodycustrecord_vendedor_msp desc "+
    " FROM transaction "+
    " JOIN transactionline "+
    " ON transactionline.transaction=transaction.id "+
    " JOIN item "+
    " ON transactionline.item=item .id "+
    " WHERE    "+
    "     transactionline.itemtype='InvtPart' "+
    "     AND transactiON .tranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')  "+
    "     AND transactiON .tranDate  <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  "+
    "     AND transactionline.location in ("+location+")  "+
    "     AND transactiON .type IN ('CustCred') ) "+
    " GROUP BY  desc,itm )AS DEVOLUCIONES_Compra "+
    " ON total_Ingresos.itm=DEVOLUCIONES_Compra.itm ))) item_conlt_prim )"
  }
  
  if(customrecord688==3){
    var proveedors=-1;
    var bproveedor=-1;
    var btcompra =-1;
    var  tcompras =-1;
    if(location==0){
      var bsucursal="1,2,3,4,5,6,23"
  }
else{
      var bsucursal=location;
  }
  if(proveedors==-1){
      var bproveedor=""
  }
  else if(proveedors==0){
      var bproveedor="AND (item.custitem10 IS NULL OR item.custitem10!='')"
  }
  else{
      var bproveedor="AND (item.custitem10='"+proveedors+"')"
  }
  if(tcompras==-1){
      var btcompra=""
  }
  else{
      var btcompra="AND (item.custitem5='"+tcompras+"')"
  }
    var sqlPrincipal = "select*from(SELECT t1.displayname as codigo,t1.articulo,t2.cantidad_vendida,venta,utilidad utlidad_Dinero,round((NULLIF(utilidad,0)/NULLIF(venta,0))*100,0) utilidad_porcentaje FROM\
    (\
        SELECT \
            item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
        FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE  inventoryitemlocations.location IN("+location+") AND item.isInactive='F' "+bproveedor+" "+btcompra+" GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
    ) t1 LEFT JOIN(\
        SELECT\
            t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,(NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
        FROM(\
            SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta, SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >='"+f_Inicio+"' AND SalesOrder.TranDate <='"+f_Final+"') AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
        )t1 FULL OUTER JOIN\
        (\
            SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >='"+f_Inicio+"' AND SalesOrder.TranDate <='"+f_Final+"' ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
        )t2 ON t1.itemid=t2.itemid\
    )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL)  )where venta!=0";
  
  }
  
 
  if(customrecord688==7){
 
    var sqlPrincipal= "select ventas_cliente.*,ROUND((ventas_cliente.venta_neta-CostoTotal)+ COALESCE(DEVOLUCIONES_Compra,0),2) Utilidad_en_dinero  from (select total_Ingresos.idcl codigo_cliente, total_Ingresos.nombre Cliente,"+
    "(COALESCE(total_ingresos,0)-(COALESCE(valor_1_para__el_5,0)+COALESCE(valor_2_para__el_5,0)))-(COALESCE(DEVOLUCIONES,0)+COALESCE(prec_pactado,0) ) Venta_neta "+
    "from (SELECT     "+
    "  sum(netamount)*-1 total_Ingresos ,   Customer.id  idcl,Customer .companyname nombre "+
    "  FROM      "+
    "    transaction join transactionline on transactionline.transaction=transaction.id    "+
    "join Customer on  transaction .entity=Customer.id  "+
    " "+
    "      where   transactionline.itemtype='InvtPart'      "+
    "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')       AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')    "+
    "    and transactionline.location in ("+location+") and transaction .type='SalesOrd' group by   Customer.id,Customer .companyname) as  total_Ingresos left join  "+
    "  (select     "+
    "   sum(netamount)*-1 valor_1_para__el_5  ,   Customer.id  idcl,Customer .companyname nombre "+
    "  FROM      "+
    "   transaction join transactionline on transactionline.transaction=transaction.id   "+
    "join Customer on  transaction .entity=Customer.id  "+
    " "+
    "     where   transactionline.itemtype='InvtPart'       "+
    "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')       AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  and transactionline.location in ("+location+")      "+
    "    and transaction .type='SalesOrd'  and transaction.terms not  in(4,20 ) group by  Customer.id,Customer .companyname)as  valor_1_para__el_5 on total_Ingresos.idcl=valor_1_para__el_5.idcl left join  "+
    "    (select     "+
    "   sum(netamount)*.95 valor_2_para__el_5,   Customer.id  idcl,Customer .companyname nombre "+
    "  FROM      "+
    "   transaction join transactionline on transactionline.transaction=transaction.id   "+
    "join Customer on  transaction .entity=Customer.id  "+
    " "+
    "     where   transactionline.itemtype='InvtPart'       "+
    "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')       AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  and transactionline.location in ("+location+")      "+
    "    and transaction .type='SalesOrd'  and transaction.terms not  in(4,20 ) group by  Customer.id,Customer .companyname)as  valor_2_para__el_5 on total_Ingresos.idcl=valor_2_para__el_5.idcl left join  "+
    "  (SELECT      "+
    "  sum(netamount)  DEVOLUCIONES,   Customer.id  idcl,Customer .companyname nombre "+
    "  FROM     "+
    "   transaction join transactionline on transactionline.transaction=transaction.id   "+
    "join Customer on  transaction .entity=Customer.id  "+
    "    where   transactionline.itemtype='InvtPart'        "+
    "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')       AND      "+
    "  transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') and transactionline.location in ("+location+") and transaction .type in ('CustCred')  "+
    "  group by Customer.id,Customer .companyname)  as  DEVOLUCIONES on total_Ingresos.idcl=DEVOLUCIONES.idcl  left join   "+
    "  (SELECT      "+
    "  sum(netamount) prec_pactado,   Customer.id  idcl,Customer .companyname nombre "+
    "  FROM     "+
    "   transaction join transactionline on transactionline.transaction=transaction.id  "+
    "join Customer on  transaction .entity=Customer.id  "+
    "      where   transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')       AND      "+
    "  transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') and transactionline.location in ("+location+") and transaction .type in ('CustCred')  and  custbody_bex_tiponc  in (1)       "+
    "  and transactionline.item = 19012     "+
    "  group by Customer.id,Customer .companyname)as  prec_pactado on total_Ingresos.idcl=prec_pactado.idcl) ventas_cliente left join"+
    
    
    ///cliente 2022
    "  (Select ROUND(sum(DEVOLUCIONES_Compra),2) DEVOLUCIONES_Compra,nombre Cliente  from    "+
    "  (SELECT       "+
    "  ROUND(quantity,2)* ROUND(costestimaterate,2)  DEVOLUCIONES_Compra,   ,   Customer.id  idcl,Customer .companyname nombre     "+
    "    FROM      "+
    "     transaction join transactionline on transactionline.transaction=transaction.id   "+
    "join Customer on  transaction .entity=Customer.id  "+
    " where   transactionline.itemtype='InvtPart'       "+
    "      AND transaction .tranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')       AND       "+
    "    transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   and transactionline.location in ("+location+")   and transaction .type in ('CustCred') ) group by   nombre)  DEVOLUCIONES_Compra  on  ventas_cliente.Cliente=DEVOLUCIONES_Compra.Cliente left join "+
    
    
    
    
    //////////////////////////////////////////qui
    "  (Select ROUND(sum(CostoTotal),2)*-1 CostoTotal,nombre Cliente    from    "+
    "  (SELECT       "+
    "  ROUND(quantity,2)* ROUND(costestimaterate,2)  CostoTotal,  ,   Customer.id  idcl,Customer .companyname nombre     "+
    "    FROM      "+
    "     transaction join transactionline on transactionline.transaction=transaction.id   "+
    "join Customer on  transaction .entity=Customer.id  "+
    " where   transactionline.itemtype='InvtPart'       "+
    "      AND transaction .tranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')       AND       "+
    "    transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  and transactionline.location in ("+location+")   and transaction .type in ('SalesOrd') ) group by   nombre)  CostoTotal  on  ventas_cliente.Cliente=CostoTotal.Cliente  "
    ///////////////////////aqui
  }
  
  
  
  if(customrecord688==4){
  
  
    var dias1432 =Dias_diferencia(f_Inicio, f_Final);
    var dias143222 =contarDomingos(f_Inicio, f_Final);
  var ff111=Dias_diferencia(f_Inicio, f_Final);
  var valor_dedia=0
  if(dias1432==0){
  valor_dedia=1
  }else(
  valor_dedia=((dias1432*2)-dias143222)+2
  )

  //" COALESCE(vtn_tot.Venta_neta / NULLIF( cantidad.cantidad,0), 0)  Precio_Promedio ,ROUND(stk_disponible / COALESCE(cantidad.cantidad / NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0)  dias_de_existencia DIAS DE INVENTARIO
  
  
  if(location !="2,4,5,6,1,3,23"){
  
   var sqlPrincipal= " select   case codigo when  1 then 'A'   when 2 then 'B'  when 3 then 'C' else 'S/N' end clasificacion,        "+
   "         ROUND(sum(tot_vtas)) tot_vtas ,  "+
   "         ROUND(sum(cantidad)) cantidad,  "+
   "         ROUND(sum(stk_disponible)) stk_disponible,  "+
   "         ROUND(sum(stk_disponible_valor)) stk_disponible_valor,  "+
   "        ROUND(  COALESCE(sum(stk_disponible_valor)/NULLIF(sum(tot_vtas)/"+valor_dedia+",0),0),0)   Dias_de_inventario__pesos, "+ 
   "       ROUND(COALESCE(sum(stk_disponible)/NULLIF(sum(cantidad)/"+valor_dedia+",0),0),0) Dias_de_inventario_piezas "+ 
   "         from( SELECT codigo,        "+
   "         tot_vtas,  "+
   "         cantidad,  "+
   "         stk_disponible,  "+
   "         stk_disponible_valor,   "+
   "         dias_de_existencia from(SELECT t3.codigo,    "+
   "               (  "+
   "     CASE  "+
   "     WHEN t3.articulo IS NULL THEN    ''  "+
   "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+  "+
   "     CASE t2.articulo  "+
   "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN    0  "+
   "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM(  "+
   "     CASE  "+
   "     WHEN t3.stock_disponible IS NULL THEN    0  "+
   "     ELSE t3.stock_disponible  "+
   "     END ),2) AS stk_disponible, ROUND((  "+
   "     CASE  "+
   "     WHEN t3.valor_de_stock IS NULL THEN    0  "+
   "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+  "+
   "     CASE t2.articulo  "+
   "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN    0  "+
   "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE((  "+
   "     CASE  "+
   "     WHEN t3.valor_de_stock IS NULL THEN    0  "+
   "     ELSE t3.valor_de_stock END) / NULLIF(SUM(  "+
   "     CASE  "+
   "     WHEN t3.stock_disponible IS NULL THEN    0  "+
   "     ELSE t3.stock_disponible  "+
   "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM(  "+
   "     CASE  "+
   "     WHEN t3.stock_disponible IS NULL THEN    0  "+
   "     ELSE t3.stock_disponible  "+
   "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+  "+
   "     CASE t2.articulo  "+
   "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN    0  "+
   "     ELSE NVL(t2.ene, 0) END) / NULLIF(4, 0), 0), 0), 0),  "+
   "         0) dias_de_existencia,  "+
   "         FROM(SELECT Ubicacion.id AS sucursalid,  "+
   "         Ubicacion.fullname,  "+
   "         SUM( SOLine.quantity )*-1 AS Ene,  "+
   "         SUM(   "+
   "     CASE  "+
   "     WHEN SalesOrder.terms=20  "+
   "         AND SOLine.item=item.id THEN  "+
   "     SOLine.netamount  "+
   "     WHEN SalesOrder.terms=4  "+
   "         AND SOLine.item=item.id THEN  "+
   "     SOLine.netamount  "+
   "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo,  "+
   "     FROM TransactiON AS SalesOrder  "+
   " INNER JOIN TransactionLine AS SOLine  "+
   "     ON ( SOLine.TransactiON = SalesOrder.ID )  "+
   "         AND ( SOLine.MainLine = 'F' )  "+
   " INNER JOIN locatiON AS Ubicacion  "+
   "     ON ( SOLine.location= Ubicacion.id )  "+
   " INNER JOIN Item  "+
   "     ON ( Item.ID = SOLine.Item )  "+
   "     WHERE ( SalesOrder.Type = 'CustInvc' )  "+
   "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')  "+
   "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY'))  "+
   "         AND ( SalesOrder.Void = 'F' )  "+
   "         AND ( SalesOrder.Voided = 'F' )  "+
   "         AND ( Item.ItemType <> 'Discount' )  "+
   "         AND ( Item.ItemType != 'Service' )  "+
   "         AND ( Item.ItemType != 'Assembly' )  "+
   "         AND ( Item.id!=25311 )  "+
   "         AND ( Ubicacion.id in("+location+") )  "+
   "     GROUP BY  Ubicacion.fullname,  "+
   "         item.fullName,  "+
   "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid,  "+
   "         Ubicacion.fullname AS fullnames,  "+
   "         SUM( SOLine.quantity )*-1 AS Ene,  "+
   "         SUM(  "+
   "     CASE  "+
   "     WHEN SalesOrder.custbody_bex_tiponc=1  "+
   "         AND SOLine.item=item.id THEN  "+
   "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(   "+
   "     CASE  "+
   "     WHEN SalesOrder.custbody_bex_tiponc=3  "+
   "         AND SOLine.item=item.id  "+
   "         AND Item.id!=19012 THEN  "+
   "     (SOLine.netamount * -1)  "+
   "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder  "+
   " INNER JOIN TransactionLine AS SOLine  "+
   "     ON ( SOLine.TransactiON = SalesOrder.ID )  "+
   "         AND ( SOLine.MainLine = 'F' )  "+
   " INNER JOIN locatiON AS Ubicacion  "+
   "     ON ( SOLine.location= Ubicacion.id )  "+
   " INNER JOIN Item  "+
   "     ON ( Item.ID = SOLine.Item )  "+
   " LEFT JOIN CUSTOMLIST224 AS clasificacion  "+
   "     ON item.custitem4 = clasificacion.id  "+
   " LEFT JOIN CUSTOMRECORD681  "+
   "     ON item.custitem15 = CUSTOMRECORD681.id  "+
   "     WHERE ( SalesOrder.Type ='CustCred')  "+
   "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')  "+
   "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY'))  "+
   "         AND ( SalesOrder.Void = 'F' )  "+
   "         AND ( SalesOrder.Voided = 'F' )  "+
   "         AND ( Item.ItemType <> 'Discount' )  "+
   "         AND ( Item.ItemType != 'Assembly' )  "+
   "         AND ( Item.id!=25311 )  "+
   "         AND ( SalesOrder.custbody_bex_tiponc=1  "+
   "         OR SalesOrder.custbody_bex_tiponc=3)  "+
   "         AND ( Ubicacion.id in("+location+") )  "+
   "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2  "+
   "     ON t2.articulo=t1.articulo FULL OUTER  "+
   " JOIN (SELECT sucursal,  "+
   "         articulo,  "+
   "         sucursalid,  "+
   "         sum(Stock_disponible) AS Stock_disponible,  "+
   "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock,  "+
   "         codigo  "+
   "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo,  "+
   "         articulo.itemid AS articulo,  "+
   "         (ubicacion_inventario.location) AS sucursalid,  "+
   "         ubicacion.fullname AS sucursal,  "+
   "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible,  "+
   "         ubicacion_inventario.averagecostmli AS valor_de_stock,          "+
   "     FROM item AS articulo  "+
   " JOIN inventoryitemlocations AS ubicacion_inventario  "+
   "     ON articulo.id =ubicacion_inventario.item  "+
   " JOIN locatiON AS ubicacion  "+
   "     ON ubicacion.id=ubicacion_inventario.location  "+
   "     WHERE ubicacion_inventario.locatiON in("+location+") )  "+
   "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3  "+
   "     ON t3.articulo=t1.articulo  "+
   "     WHERE ((  "+
   "     CASE  "+
   "     WHEN t3.valor_de_stock IS NULL THEN    0  "+
   "     ELSE t3.valor_de_stock END)!=0  "+
   "         OR (NVL(t1.ene,0)+  "+
   "     CASE t2.articulo  "+
   "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN    0  "+
   "     ELSE NVL(t2.ene,0) END)!=0  "+
   "         OR (  "+
   "     CASE  "+
   "     WHEN t3.stock_disponible IS NULL THEN    0  "+
   "     ELSE t3.stock_disponible  "+
   "     END )!=0  "+
   "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)  "+
   "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo  "+
   " ORDER BY  tot_vtAS DESC ) )group by codigo  " }
   else{
  
  
    var sqlPrincipal= " SELECT case codigo when  1 then 'A'   when 2 then 'B'  when 3 then 'C' else 'S/N' end clasificacion, "+
    "         ROUND(sum(tot_vtas)) tot_vtas, "+
    "         ROUND(sum(cantidad)) cantidad, "+
    "         ROUND(sum(stk_disponible)) stk_disponible, "+
    "         ROUND(sum(stk_disponible_valor)-58840.2) stk_disponible_valor, "+
    "        ROUND(  COALESCE(sum(stk_disponible_valor)/NULLIF(sum(tot_vtas)/"+valor_dedia+",0),0),0)   Dias_de_inventario__pesos, "+ 
    "  ROUND(COALESCE(sum(stk_disponible)/NULLIF(sum(cantidad)/"+valor_dedia+",0),0),0) Dias_de_inventario_piezas  "+
    "     FROM (SELECT * from(SELECT t3.codigo, "+
    "         ( "+
    "     CASE "+
    "     WHEN t3.articulo IS NULL THEN "+
    "     '' "+
    "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ),2) AS stk_disponible, ROUND(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene, "+
    "         0) END) / NULLIF(1, "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0) dias_de_existencia, "+
    "         FROM(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.terms=20 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     WHEN SalesOrder.terms=4 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
    "     FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Service' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( Ubicacion.id in(2) ) "+
    "     GROUP BY  Ubicacion.fullname, "+
    "         item.fullName, "+
    "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname AS fullnames, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM( "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
    "         AND SOLine.item=item.id THEN "+
    "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
    "         AND SOLine.item=item.id "+
    "         AND Item.id!=19012 THEN "+
    "     (SOLine.netamount * -1) "+
    "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
    "     ON item.custitem4 = clasificacion.id "+
    " LEFT JOIN CUSTOMRECORD681 "+
    "     ON item.custitem15 = CUSTOMRECORD681.id "+
    "     WHERE ( SalesOrder.Type ='CustCred') "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
    "         OR SalesOrder.custbody_bex_tiponc=3) "+
    "         AND ( Ubicacion.id in(2) ) "+
    "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
    "     ON t2.articulo=t1.articulo FULL OUTER "+
    " JOIN (SELECT sucursal, "+
    "         articulo, "+
    "         sucursalid, "+
    "         sum(Stock_disponible) AS Stock_disponible, "+
    "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
    "         codigo "+
    "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
    "         articulo.itemid AS articulo, "+
    "         (ubicacion_inventario.location) AS sucursalid, "+
    "         ubicacion.fullname AS sucursal, "+
    "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
    "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
    "          "+
    "     FROM item AS articulo "+
    " JOIN inventoryitemlocations AS ubicacion_inventario "+
    "     ON articulo.id =ubicacion_inventario.item "+
    " JOIN locatiON AS ubicacion "+
    "     ON ubicacion.id=ubicacion_inventario.location "+
    "     WHERE ubicacion_inventario.locatiON in(2) ) "+
    "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
    "     ON t3.articulo=t1.articulo "+
    "     WHERE (( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END)!=0 "+
    "         OR (NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END)!=0 "+
    "         OR ( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END )!=0 "+
    "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
    "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
    " ORDER BY  tot_vtAS DESC ) "+
    " UNION ALL "+
    " select* from(SELECT t3.codigo, "+
    "         ( "+
    "     CASE "+
    "     WHEN t3.articulo IS NULL THEN "+
    "     '' "+
    "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ),2) AS stk_disponible, ROUND(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene, "+
    "         0) END) / NULLIF(1, "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0) dias_de_existencia, "+
    "         FROM(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.terms=20 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     WHEN SalesOrder.terms=4 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
    "     FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Service' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( Ubicacion.id in(4) ) "+
    "     GROUP BY  Ubicacion.fullname, "+
    "         item.fullName, "+
    "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname AS fullnames, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM( "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
    "         AND SOLine.item=item.id THEN "+
    "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
    "         AND SOLine.item=item.id "+
    "         AND Item.id!=19012 THEN "+
    "     (SOLine.netamount * -1) "+
    "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
    "     ON item.custitem4 = clasificacion.id "+
    " LEFT JOIN CUSTOMRECORD681 "+
    "     ON item.custitem15 = CUSTOMRECORD681.id "+
    "     WHERE ( SalesOrder.Type ='CustCred') "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
    "         OR SalesOrder.custbody_bex_tiponc=3) "+
    "         AND ( Ubicacion.id in(4) ) "+
    "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
    "     ON t2.articulo=t1.articulo FULL OUTER "+
    " JOIN (SELECT sucursal, "+
    "         articulo, "+
    "         sucursalid, "+
    "         sum(Stock_disponible) AS Stock_disponible, "+
    "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
    "         codigo "+
    "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
    "         articulo.itemid AS articulo, "+
    "         (ubicacion_inventario.location) AS sucursalid, "+
    "         ubicacion.fullname AS sucursal, "+
    "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
    "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
    "          "+
    "     FROM item AS articulo "+
    " JOIN inventoryitemlocations AS ubicacion_inventario "+
    "     ON articulo.id =ubicacion_inventario.item "+
    " JOIN locatiON AS ubicacion "+
    "     ON ubicacion.id=ubicacion_inventario.location "+
    "     WHERE ubicacion_inventario.locatiON in(4) ) "+
    "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
    "     ON t3.articulo=t1.articulo "+
    "     WHERE (( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END)!=0 "+
    "         OR (NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END)!=0 "+
    "         OR ( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END )!=0 "+
    "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
    "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
    " ORDER BY  tot_vtAS DESC ) "+
    " UNION ALL "+
    " select* from(SELECT t3.codigo, "+
    "         ( "+
    "     CASE "+
    "     WHEN t3.articulo IS NULL THEN "+
    "     '' "+
    "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ),2) AS stk_disponible, ROUND(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene, "+
    "         0) END) / NULLIF(1, "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0) dias_de_existencia, "+
    "         FROM(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.terms=20 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     WHEN SalesOrder.terms=4 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
    "     FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Service' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( Ubicacion.id in(5) ) "+
    "     GROUP BY  Ubicacion.fullname, "+
    "         item.fullName, "+
    "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname AS fullnames, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM( "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
    "         AND SOLine.item=item.id THEN "+
    "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
    "         AND SOLine.item=item.id "+
    "         AND Item.id!=19012 THEN "+
    "     (SOLine.netamount * -1) "+
    "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
    "     ON item.custitem4 = clasificacion.id "+
    " LEFT JOIN CUSTOMRECORD681 "+
    "     ON item.custitem15 = CUSTOMRECORD681.id "+
    "     WHERE ( SalesOrder.Type ='CustCred') "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
    "         OR SalesOrder.custbody_bex_tiponc=3) "+
    "         AND ( Ubicacion.id in(5) ) "+
    "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
    "     ON t2.articulo=t1.articulo FULL OUTER "+
    " JOIN (SELECT sucursal, "+
    "         articulo, "+
    "         sucursalid, "+
    "         sum(Stock_disponible) AS Stock_disponible, "+
    "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
    "         codigo "+
    "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
    "         articulo.itemid AS articulo, "+
    "         (ubicacion_inventario.location) AS sucursalid, "+
    "         ubicacion.fullname AS sucursal, "+
    "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
    "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
    "          "+
    "     FROM item AS articulo "+
    " JOIN inventoryitemlocations AS ubicacion_inventario "+
    "     ON articulo.id =ubicacion_inventario.item "+
    " JOIN locatiON AS ubicacion "+
    "     ON ubicacion.id=ubicacion_inventario.location "+
    "     WHERE ubicacion_inventario.locatiON in(5) ) "+
    "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
    "     ON t3.articulo=t1.articulo "+
    "     WHERE (( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END)!=0 "+
    "         OR (NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END)!=0 "+
    "         OR ( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END )!=0 "+
    "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
    "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
    " ORDER BY  tot_vtAS DESC ) "+
    " UNION ALL "+
    " select* from(SELECT t3.codigo, "+
    "         ( "+
    "     CASE "+
    "     WHEN t3.articulo IS NULL THEN "+
    "     '' "+
    "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ),2) AS stk_disponible, ROUND(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene, "+
    "         0) END) / NULLIF(1, "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0) dias_de_existencia, "+
    "         FROM(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.terms=20 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     WHEN SalesOrder.terms=4 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
    "     FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Service' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( Ubicacion.id in(6) ) "+
    "     GROUP BY  Ubicacion.fullname, "+
    "         item.fullName, "+
    "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname AS fullnames, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM( "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
    "         AND SOLine.item=item.id THEN "+
    "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
    "         AND SOLine.item=item.id "+
    "         AND Item.id!=19012 THEN "+
    "     (SOLine.netamount * -1) "+
    "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
    "     ON item.custitem4 = clasificacion.id "+
    " LEFT JOIN CUSTOMRECORD681 "+
    "     ON item.custitem15 = CUSTOMRECORD681.id "+
    "     WHERE ( SalesOrder.Type ='CustCred') "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
    "         OR SalesOrder.custbody_bex_tiponc=3) "+
    "         AND ( Ubicacion.id in(6) ) "+
    "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
    "     ON t2.articulo=t1.articulo FULL OUTER "+
    " JOIN (SELECT sucursal, "+
    "         articulo, "+
    "         sucursalid, "+
    "         sum(Stock_disponible) AS Stock_disponible, "+
    "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
    "         codigo "+
    "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
    "         articulo.itemid AS articulo, "+
    "         (ubicacion_inventario.location) AS sucursalid, "+
    "         ubicacion.fullname AS sucursal, "+
    "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
    "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
    "          "+
    "     FROM item AS articulo "+
    " JOIN inventoryitemlocations AS ubicacion_inventario "+
    "     ON articulo.id =ubicacion_inventario.item "+
    " JOIN locatiON AS ubicacion "+
    "     ON ubicacion.id=ubicacion_inventario.location "+
    "     WHERE ubicacion_inventario.locatiON in(6) ) "+
    "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
    "     ON t3.articulo=t1.articulo "+
    "     WHERE (( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END)!=0 "+
    "         OR (NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END)!=0 "+
    "         OR ( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END )!=0 "+
    "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
    "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
    " ORDER BY  tot_vtAS DESC ) "+
    " UNION ALL "+
    " select* from(SELECT t3.codigo, "+
    "         ( "+
    "     CASE "+
    "     WHEN t3.articulo IS NULL THEN "+
    "     '' "+
    "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ),2) AS stk_disponible, ROUND(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene, "+
    "         0) END) / NULLIF(1, "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0) dias_de_existencia, "+
    "         FROM(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.terms=20 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     WHEN SalesOrder.terms=4 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
    "     FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Service' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( Ubicacion.id in(1) ) "+
    "     GROUP BY  Ubicacion.fullname, "+
    "         item.fullName, "+
    "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname AS fullnames, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM( "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
    "         AND SOLine.item=item.id THEN "+
    "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
    "         AND SOLine.item=item.id "+
    "         AND Item.id!=19012 THEN "+
    "     (SOLine.netamount * -1) "+
    "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
    "     ON item.custitem4 = clasificacion.id "+
    " LEFT JOIN CUSTOMRECORD681 "+
    "     ON item.custitem15 = CUSTOMRECORD681.id "+
    "     WHERE ( SalesOrder.Type ='CustCred') "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
    "         OR SalesOrder.custbody_bex_tiponc=3) "+
    "         AND ( Ubicacion.id in(1) ) "+
    "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
    "     ON t2.articulo=t1.articulo FULL OUTER "+
    " JOIN (SELECT sucursal, "+
    "         articulo, "+
    "         sucursalid, "+
    "         sum(Stock_disponible) AS Stock_disponible, "+
    "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
    "         codigo "+
    "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
    "         articulo.itemid AS articulo, "+
    "         (ubicacion_inventario.location) AS sucursalid, "+
    "         ubicacion.fullname AS sucursal, "+
    "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
    "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
    "          "+
    "     FROM item AS articulo "+
    " JOIN inventoryitemlocations AS ubicacion_inventario "+
    "     ON articulo.id =ubicacion_inventario.item "+
    " JOIN locatiON AS ubicacion "+
    "     ON ubicacion.id=ubicacion_inventario.location "+
    "     WHERE ubicacion_inventario.locatiON in(1) ) "+
    "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
    "     ON t3.articulo=t1.articulo "+
    "     WHERE (( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END)!=0 "+
    "         OR (NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END)!=0 "+
    "         OR ( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END )!=0 "+
    "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
    "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
    " ORDER BY  tot_vtAS DESC ) "+
    " UNION ALL "+
    " select* from(SELECT t3.codigo, "+
    "         ( "+
    "     CASE "+
    "     WHEN t3.articulo IS NULL THEN "+
    "     '' "+
    "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ),2) AS stk_disponible, ROUND(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene, "+
    "         0) END) / NULLIF(1, "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0) dias_de_existencia, "+
    "         FROM(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.terms=20 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     WHEN SalesOrder.terms=4 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
    "     FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Service' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( Ubicacion.id in(3) ) "+
    "     GROUP BY  Ubicacion.fullname, "+
    "         item.fullName, "+
    "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname AS fullnames, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM( "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
    "         AND SOLine.item=item.id THEN "+
    "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
    "         AND SOLine.item=item.id "+
    "         AND Item.id!=19012 THEN "+
    "     (SOLine.netamount * -1) "+
    "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
    "     ON item.custitem4 = clasificacion.id "+
    " LEFT JOIN CUSTOMRECORD681 "+
    "     ON item.custitem15 = CUSTOMRECORD681.id "+
    "     WHERE ( SalesOrder.Type ='CustCred') "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
    "         OR SalesOrder.custbody_bex_tiponc=3) "+
    "         AND ( Ubicacion.id in(3) ) "+
    "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
    "     ON t2.articulo=t1.articulo FULL OUTER "+
    " JOIN (SELECT sucursal, "+
    "         articulo, "+
    "         sucursalid, "+
    "         sum(Stock_disponible) AS Stock_disponible, "+
    "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
    "         codigo "+
    "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
    "         articulo.itemid AS articulo, "+
    "         (ubicacion_inventario.location) AS sucursalid, "+
    "         ubicacion.fullname AS sucursal, "+
    "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
    "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
    "          "+
    "     FROM item AS articulo "+
    " JOIN inventoryitemlocations AS ubicacion_inventario "+
    "     ON articulo.id =ubicacion_inventario.item "+
    " JOIN locatiON AS ubicacion "+
    "     ON ubicacion.id=ubicacion_inventario.location "+
    "     WHERE ubicacion_inventario.locatiON in(3) ) "+
    "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
    "     ON t3.articulo=t1.articulo "+
    "     WHERE (( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END)!=0 "+
    "         OR (NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END)!=0 "+
    "         OR ( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END )!=0 "+
    "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
    "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
    " ORDER BY  tot_vtAS DESC ) "+
    " UNION ALL "+
    " select* from(SELECT t3.codigo, "+
    "         ( "+
    "     CASE "+
    "     WHEN t3.articulo IS NULL THEN "+
    "     '' "+
    "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ),2) AS stk_disponible, ROUND(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene, "+
    "         0) END) / NULLIF(1, "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0) dias_de_existencia, "+
    "         FROM(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.terms=20 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     WHEN SalesOrder.terms=4 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
    "     FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Service' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( Ubicacion.id in(23) ) "+
    "     GROUP BY  Ubicacion.fullname, "+
    "         item.fullName, "+
    "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname AS fullnames, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM( "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
    "         AND SOLine.item=item.id THEN "+
    "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
    "         AND SOLine.item=item.id "+
    "         AND Item.id!=19012 THEN "+
    "     (SOLine.netamount * -1) "+
    "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
    "     ON item.custitem4 = clasificacion.id "+
    " LEFT JOIN CUSTOMRECORD681 "+
    "     ON item.custitem15 = CUSTOMRECORD681.id "+
    "     WHERE ( SalesOrder.Type ='CustCred') "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
    "         OR SalesOrder.custbody_bex_tiponc=3) "+
    "         AND ( Ubicacion.id in(23) ) "+
    "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
    "     ON t2.articulo=t1.articulo FULL OUTER "+
    " JOIN (SELECT sucursal, "+
    "         articulo, "+
    "         sucursalid, "+
    "         sum(Stock_disponible) AS Stock_disponible, "+
    "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
    "         codigo "+
    "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
    "         articulo.itemid AS articulo, "+
    "         (ubicacion_inventario.location) AS sucursalid, "+
    "         ubicacion.fullname AS sucursal, "+
    "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
    "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
    "          "+
    "     FROM item AS articulo "+
    " JOIN inventoryitemlocations AS ubicacion_inventario "+
    "     ON articulo.id =ubicacion_inventario.item "+
    " JOIN locatiON AS ubicacion "+
    "     ON ubicacion.id=ubicacion_inventario.location "+
    "     WHERE ubicacion_inventario.locatiON in(23) ) "+
    "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
    "     ON t3.articulo=t1.articulo "+
    "     WHERE (( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END)!=0 "+
    "         OR (NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END)!=0 "+
    "         OR ( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END )!=0 "+
    "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
    "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
    " ORDER BY  tot_vtAS DESC )"+
    " UNION ALL "+
    " select* from(SELECT t3.codigo, "+
    "         ( "+
    "     CASE "+
    "     WHEN t3.articulo IS NULL THEN "+
    "     '' "+
    "     ELSE t3.articulo END) AS articulo, 0 AS tot_vtAS , 0 as cantidad, ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ),2) AS stk_disponible, ROUND(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene, "+
    "         0) END) / NULLIF(1, "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0) dias_de_existencia, "+
    "         FROM(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.terms=20 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     WHEN SalesOrder.terms=4 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
    "     FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Service' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( Ubicacion.id in(26) ) "+
    "     GROUP BY  Ubicacion.fullname, "+
    "         item.fullName, "+
    "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname AS fullnames, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM( "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
    "         AND SOLine.item=item.id THEN "+
    "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
    "         AND SOLine.item=item.id "+
    "         AND Item.id!=19012 THEN "+
    "     (SOLine.netamount * -1) "+
    "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
    "     ON item.custitem4 = clasificacion.id "+
    " LEFT JOIN CUSTOMRECORD681 "+
    "     ON item.custitem15 = CUSTOMRECORD681.id "+
    "     WHERE ( SalesOrder.Type ='CustCred') "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
    "         OR SalesOrder.custbody_bex_tiponc=3) "+
    "         AND ( Ubicacion.id in(26) ) "+
    "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
    "     ON t2.articulo=t1.articulo FULL OUTER "+
    " JOIN (SELECT sucursal, "+
    "         articulo, "+
    "         sucursalid, "+
    "         sum(Stock_disponible) AS Stock_disponible, "+
    "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
    "         codigo "+
    "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
    "         articulo.itemid AS articulo, "+
    "         (ubicacion_inventario.location) AS sucursalid, "+
    "         ubicacion.fullname AS sucursal, "+
    "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
    "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
    "          "+
    "     FROM item AS articulo "+
    " JOIN inventoryitemlocations AS ubicacion_inventario "+
    "     ON articulo.id =ubicacion_inventario.item "+
    " JOIN locatiON AS ubicacion "+
    "     ON ubicacion.id=ubicacion_inventario.location "+
    "     WHERE ubicacion_inventario.locatiON in(26) ) "+
    "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
    "     ON t3.articulo=t1.articulo "+
    "     WHERE (( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END)!=0 "+
    "         OR (NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END)!=0 "+
    "         OR ( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END )!=0 "+
    "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
    "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
    " ORDER BY  tot_vtAS DESC )"+
      " UNION ALL "+
    " select* from(SELECT t3.codigo, "+
    "         ( "+
    "     CASE "+
    "     WHEN t3.articulo IS NULL THEN "+
    "     '' "+
    "     ELSE t3.articulo END) AS articulo, 0 AS tot_vtAS , 0 as cantidad, ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ),2) AS stk_disponible, ROUND(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene, "+
    "         0) END) / NULLIF(1, "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0) dias_de_existencia, "+
    "         FROM(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.terms=20 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     WHEN SalesOrder.terms=4 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
    "     FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Service' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( Ubicacion.id in(12) ) "+
    "     GROUP BY  Ubicacion.fullname, "+
    "         item.fullName, "+
    "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname AS fullnames, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM( "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
    "         AND SOLine.item=item.id THEN "+
    "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
    "         AND SOLine.item=item.id "+
    "         AND Item.id!=19012 THEN "+
    "     (SOLine.netamount * -1) "+
    "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
    "     ON item.custitem4 = clasificacion.id "+
    " LEFT JOIN CUSTOMRECORD681 "+
    "     ON item.custitem15 = CUSTOMRECORD681.id "+
    "     WHERE ( SalesOrder.Type ='CustCred') "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
    "         OR SalesOrder.custbody_bex_tiponc=3) "+
    "         AND ( Ubicacion.id in(12) ) "+
    "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
    "     ON t2.articulo=t1.articulo FULL OUTER "+
    " JOIN (SELECT sucursal, "+
    "         articulo, "+
    "         sucursalid, "+
    "         sum(Stock_disponible) AS Stock_disponible, "+
    "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
    "         codigo "+
    "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
    "         articulo.itemid AS articulo, "+
    "         (ubicacion_inventario.location) AS sucursalid, "+
    "         ubicacion.fullname AS sucursal, "+
    "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
    "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
    "          "+
    "     FROM item AS articulo "+
    " JOIN inventoryitemlocations AS ubicacion_inventario "+
    "     ON articulo.id =ubicacion_inventario.item "+
    " JOIN locatiON AS ubicacion "+
    "     ON ubicacion.id=ubicacion_inventario.location "+
    "     WHERE ubicacion_inventario.locatiON in(12) ) "+
    "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
    "     ON t3.articulo=t1.articulo "+
    "     WHERE (( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END)!=0 "+
    "         OR (NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END)!=0 "+
    "         OR ( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END )!=0 "+
    "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
    "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
    " ORDER BY  tot_vtAS DESC )"+
      " UNION ALL "+
    " select* from(SELECT t3.codigo, "+
    "         ( "+
    "     CASE "+
    "     WHEN t3.articulo IS NULL THEN "+
    "     '' "+
    "     ELSE t3.articulo END) AS articulo, 0 AS tot_vtAS , 0 as cantidad, ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ),2) AS stk_disponible, ROUND(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene, "+
    "         0) END) / NULLIF(1, "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0) dias_de_existencia, "+
    "         FROM(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.terms=20 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     WHEN SalesOrder.terms=4 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
    "     FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Service' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( Ubicacion.id in(32) ) "+
    "     GROUP BY  Ubicacion.fullname, "+
    "         item.fullName, "+
    "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname AS fullnames, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM( "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
    "         AND SOLine.item=item.id THEN "+
    "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
    "         AND SOLine.item=item.id "+
    "         AND Item.id!=19012 THEN "+
    "     (SOLine.netamount * -1) "+
    "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
    "     ON item.custitem4 = clasificacion.id "+
    " LEFT JOIN CUSTOMRECORD681 "+
    "     ON item.custitem15 = CUSTOMRECORD681.id "+
    "     WHERE ( SalesOrder.Type ='CustCred') "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
    "         OR SalesOrder.custbody_bex_tiponc=3) "+
    "         AND ( Ubicacion.id in(32) ) "+
    "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
    "     ON t2.articulo=t1.articulo FULL OUTER "+
    " JOIN (SELECT sucursal, "+
    "         articulo, "+
    "         sucursalid, "+
    "         sum(Stock_disponible) AS Stock_disponible, "+
    "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
    "         codigo "+
    "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
    "         articulo.itemid AS articulo, "+
    "         (ubicacion_inventario.location) AS sucursalid, "+
    "         ubicacion.fullname AS sucursal, "+
    "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
    "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
    "          "+
    "     FROM item AS articulo "+
    " JOIN inventoryitemlocations AS ubicacion_inventario "+
    "     ON articulo.id =ubicacion_inventario.item "+
    " JOIN locatiON AS ubicacion "+
    "     ON ubicacion.id=ubicacion_inventario.location "+
    "     WHERE ubicacion_inventario.locatiON in(32) ) "+
    "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
    "     ON t3.articulo=t1.articulo "+
    "     WHERE (( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END)!=0 "+
    "         OR (NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END)!=0 "+
    "         OR ( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END )!=0 "+
    "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
    "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
    " ORDER BY  tot_vtAS DESC )"+
      " UNION ALL "+
    " select* from(SELECT t3.codigo, "+
    "         ( "+
    "     CASE "+
    "     WHEN t3.articulo IS NULL THEN "+
    "     '' "+
    "     ELSE t3.articulo END) AS articulo, 0 AS tot_vtAS , 0 as cantidad, ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ),2) AS stk_disponible, ROUND(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene, "+
    "         0) END) / NULLIF(1, "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0) dias_de_existencia, "+
    "         FROM(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.terms=20 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     WHEN SalesOrder.terms=4 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
    "     FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Service' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( Ubicacion.id in(21) ) "+
    "     GROUP BY  Ubicacion.fullname, "+
    "         item.fullName, "+
    "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname AS fullnames, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM( "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
    "         AND SOLine.item=item.id THEN "+
    "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
    "         AND SOLine.item=item.id "+
    "         AND Item.id!=19012 THEN "+
    "     (SOLine.netamount * -1) "+
    "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
    "     ON item.custitem4 = clasificacion.id "+
    " LEFT JOIN CUSTOMRECORD681 "+
    "     ON item.custitem15 = CUSTOMRECORD681.id "+
    "     WHERE ( SalesOrder.Type ='CustCred') "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
    "         OR SalesOrder.custbody_bex_tiponc=3) "+
    "         AND ( Ubicacion.id in(21) ) "+
    "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
    "     ON t2.articulo=t1.articulo FULL OUTER "+
    " JOIN (SELECT sucursal, "+
    "         articulo, "+
    "         sucursalid, "+
    "         sum(Stock_disponible) AS Stock_disponible, "+
    "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
    "         codigo "+
    "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
    "         articulo.itemid AS articulo, "+
    "         (ubicacion_inventario.location) AS sucursalid, "+
    "         ubicacion.fullname AS sucursal, "+
    "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
    "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
    "          "+
    "     FROM item AS articulo "+
    " JOIN inventoryitemlocations AS ubicacion_inventario "+
    "     ON articulo.id =ubicacion_inventario.item "+
    " JOIN locatiON AS ubicacion "+
    "     ON ubicacion.id=ubicacion_inventario.location "+
    "     WHERE ubicacion_inventario.locatiON in(21) ) "+
    "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
    "     ON t3.articulo=t1.articulo "+
    "     WHERE (( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END)!=0 "+
    "         OR (NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END)!=0 "+
    "         OR ( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END )!=0 "+
    "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
    "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
    " ORDER BY  tot_vtAS DESC )"+
      " UNION ALL "+
    " select* from(SELECT t3.codigo, "+
    "         ( "+
    "     CASE "+
    "     WHEN t3.articulo IS NULL THEN "+
    "     '' "+
    "     ELSE t3.articulo END) AS articulo, 0 AS tot_vtAS , 0 as cantidad, ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ),2) AS stk_disponible, ROUND(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene, "+
    "         0) END) / NULLIF(1, "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0) dias_de_existencia, "+
    "         FROM(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.terms=20 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     WHEN SalesOrder.terms=4 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
    "     FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Service' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( Ubicacion.id in(32) ) "+
    "     GROUP BY  Ubicacion.fullname, "+
    "         item.fullName, "+
    "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname AS fullnames, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM( "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
    "         AND SOLine.item=item.id THEN "+
    "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
    "         AND SOLine.item=item.id "+
    "         AND Item.id!=19012 THEN "+
    "     (SOLine.netamount * -1) "+
    "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
    "     ON item.custitem4 = clasificacion.id "+
    " LEFT JOIN CUSTOMRECORD681 "+
    "     ON item.custitem15 = CUSTOMRECORD681.id "+
    "     WHERE ( SalesOrder.Type ='CustCred') "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
    "         OR SalesOrder.custbody_bex_tiponc=3) "+
    "         AND ( Ubicacion.id in(32) ) "+
    "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
    "     ON t2.articulo=t1.articulo FULL OUTER "+
    " JOIN (SELECT sucursal, "+
    "         articulo, "+
    "         sucursalid, "+
    "         sum(Stock_disponible) AS Stock_disponible, "+
    "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
    "         codigo "+
    "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
    "         articulo.itemid AS articulo, "+
    "         (ubicacion_inventario.location) AS sucursalid, "+
    "         ubicacion.fullname AS sucursal, "+
    "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
    "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
    "          "+
    "     FROM item AS articulo "+
    " JOIN inventoryitemlocations AS ubicacion_inventario "+
    "     ON articulo.id =ubicacion_inventario.item "+
    " JOIN locatiON AS ubicacion "+
    "     ON ubicacion.id=ubicacion_inventario.location "+
    "     WHERE ubicacion_inventario.locatiON in(32) ) "+
    "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
    "     ON t3.articulo=t1.articulo "+
    "     WHERE (( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END)!=0 "+
    "         OR (NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END)!=0 "+
    "         OR ( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END )!=0 "+
    "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
    "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
    " ORDER BY  tot_vtAS DESC )"+
      " UNION ALL "+
    " select* from(SELECT t3.codigo, "+
    "         ( "+
    "     CASE "+
    "     WHEN t3.articulo IS NULL THEN "+
    "     '' "+
    "     ELSE t3.articulo END) AS articulo, 0 AS tot_vtAS , 0 as cantidad, ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ),2) AS stk_disponible, ROUND(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene, "+
    "         0) END) / NULLIF(1, "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0), "+
    "         0) dias_de_existencia, "+
    "         FROM(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.terms=20 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     WHEN SalesOrder.terms=4 "+
    "         AND SOLine.item=item.id THEN "+
    "     SOLine.netamount "+
    "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
    "     FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Service' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( Ubicacion.id in(21) ) "+
    "     GROUP BY  Ubicacion.fullname, "+
    "         item.fullName, "+
    "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
    "         Ubicacion.fullname AS fullnames, "+
    "         SUM( SOLine.quantity )*-1 AS Ene, "+
    "         SUM( "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
    "         AND SOLine.item=item.id THEN "+
    "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
    "     CASE "+
    "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
    "         AND SOLine.item=item.id "+
    "         AND Item.id!=19012 THEN "+
    "     (SOLine.netamount * -1) "+
    "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
    " INNER JOIN TransactionLine AS SOLine "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
    "         AND ( SOLine.MainLine = 'F' ) "+
    " INNER JOIN locatiON AS Ubicacion "+
    "     ON ( SOLine.location= Ubicacion.id ) "+
    " INNER JOIN Item "+
    "     ON ( Item.ID = SOLine.Item ) "+
    " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
    "     ON item.custitem4 = clasificacion.id "+
    " LEFT JOIN CUSTOMRECORD681 "+
    "     ON item.custitem15 = CUSTOMRECORD681.id "+
    "     WHERE ( SalesOrder.Type ='CustCred') "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
    "         AND ( SalesOrder.Void = 'F' ) "+
    "         AND ( SalesOrder.Voided = 'F' ) "+
    "         AND ( Item.ItemType <> 'Discount' ) "+
    "         AND ( Item.ItemType != 'Assembly' ) "+
    "         AND ( Item.id!=25311 ) "+
    "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
    "         OR SalesOrder.custbody_bex_tiponc=3) "+
    "         AND ( Ubicacion.id in(21) ) "+
    "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
    "     ON t2.articulo=t1.articulo FULL OUTER "+
    " JOIN (SELECT sucursal, "+
    "         articulo, "+
    "         sucursalid, "+
    "         sum(Stock_disponible) AS Stock_disponible, "+
    "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
    "         codigo "+
    "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
    "         articulo.itemid AS articulo, "+
    "         (ubicacion_inventario.location) AS sucursalid, "+
    "         ubicacion.fullname AS sucursal, "+
    "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
    "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
    "          "+
    "     FROM item AS articulo "+
    " JOIN inventoryitemlocations AS ubicacion_inventario "+
    "     ON articulo.id =ubicacion_inventario.item "+
    " JOIN locatiON AS ubicacion "+
    "     ON ubicacion.id=ubicacion_inventario.location "+
    "     WHERE ubicacion_inventario.locatiON in(21) ) "+
    "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
    "     ON t3.articulo=t1.articulo "+
    "     WHERE (( "+
    "     CASE "+
    "     WHEN t3.valor_de_stock IS NULL THEN "+
    "     0 "+
    "     ELSE t3.valor_de_stock END)!=0 "+
    "         OR (NVL(t1.ene,0)+ "+
    "     CASE t2.articulo "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
    "     0 "+
    "     ELSE NVL(t2.ene,0) END)!=0 "+
    "         OR ( "+
    "     CASE "+
    "     WHEN t3.stock_disponible IS NULL THEN "+
    "     0 "+
    "     ELSE t3.stock_disponible "+
    "     END )!=0 "+
    "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
    "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
    " ORDER BY  tot_vtAS DESC )"+
    " ) "+
    "     GROUP BY  codigo "
  
   }
  }
  
  
  if(customrecord688==6){
/////////////
var proveedors=-1;
var bproveedor=-1;
var btcompra =-1;
var  tcompras =-1;
if(location==0){
  var bsucursal="1,2,3,4,5,6,23"
}
else{
  var bsucursal=location;
}
if(proveedors==-1){
  var bproveedor=""
}
else if(proveedors==0){
  var bproveedor="AND (item.custitem10 IS NULL OR item.custitem10!='')"
}
else{
  var bproveedor="AND (item.custitem10='"+proveedors+"')"
}
if(tcompras==-1){
  var btcompra=""
}
else{
  var btcompra="AND (item.custitem5='"+tcompras+"')"
}
var sqlPrincipal = "select customrecord681.name marca,a.articulo, a.cantidad_vendida, a.venta , a.utlidad_Dinero  from(select*from(SELECT t1.displayname as codigo,t1.articulo,t2.cantidad_vendida,venta,utilidad utlidad_Dinero,round((NULLIF(utilidad,0)/NULLIF(venta,0))*100,0) utilidad_porcentaje FROM\
(\
    SELECT \
        item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
    FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE  inventoryitemlocations.location IN("+location+") AND item.isInactive='F' "+bproveedor+" "+btcompra+" GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
) t1 LEFT JOIN(\
    SELECT\
        t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,(NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
    FROM(\
        SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta, SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >='"+f_Inicio+"' AND SalesOrder.TranDate <='"+f_Final+"') AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
    )t1 FULL OUTER JOIN\
    (\
        SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >='"+f_Inicio+"' AND SalesOrder.TranDate <='"+f_Final+"' ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
    )t2 ON t1.itemid=t2.itemid\
)t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL)  )where venta!=0) a join item on a.codigo=item.displayname left join  customrecord681 on  item.custitem15=customrecord681.id ";


/*





    
  
    var sqlPrincipal= "select  customrecord681.name,N2.articulo,N2.cantidad,N2.venta_neta,  N2.utilidad from(select itm,articulo,cantidad,venta_neta, ROUND(Utilidad,0) utilidad from (select  total_Ingresos.itm itm,,total_Ingresos.desc articulo, total_Ingresos.cantidad*-1 cantidad ,  "+
    "(COALESCE(total_ingresos,0)-(COALESCE(valor_1_para__el_5,0)+COALESCE(valor_2_para__el_5,0)))-(COALESCE(DEVOLUCIONES,0) ) Venta_neta, "+
    " ((COALESCE(total_ingresos,0)-(COALESCE(valor_1_para__el_5,0)+COALESCE(valor_2_para__el_5,0)))-(COALESCE(DEVOLUCIONES,0) ) -CostoTotal)+ COALESCE(DEVOLUCIONES_Compra,0) Utilidad , "+
    " CostoTotal margen   "+
    "from (SELECT      "+
    "  sum(netamount)*-1 total_Ingresos ,  ROUND(sum(quantity),2) cantidad, transactionline.item itm,item.description desc "+
    "  FROM      "+
    "    transaction join transactionline on transactionline.transaction=transaction.id    "+
    "join item on  transactionline.item=item .id    "+
    " "+
    "      where   transactionline.itemtype='InvtPart'      "+
    "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')      "+
    "    and transactionline.location in ("+location+") and transaction .type='SalesOrd' group by    transactionline.item,item.description) as  total_Ingresos left join  "+
    "  (select      "+
    "   sum(netamount)*-1 valor_1_para__el_5  ,   transactionline.item itm,item.description desc "+
    "  FROM      "+
    "   transaction join transactionline on transactionline.transaction=transaction.id   "+
    "join item on  transactionline.item=item .id   "+
    "     where   transactionline.itemtype='InvtPart'       "+
    "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')    and transactionline.location in ("+location+")      "+
    "    and transaction .type='SalesOrd'  and terms not  in(4,20 ) group by   transactionline.item,item.description)as  valor_1_para__el_5 on total_Ingresos.itm=valor_1_para__el_5.itm left join  "+
    " "+
    "    (select      "+
    "   sum(netamount)*.95 valor_2_para__el_5,   transactionline.item itm,item.description  desc "+
    "  FROM      "+
    "   transaction join transactionline on transactionline.transaction=transaction.id   "+
    "join item on  transactionline.item=item .id    "+
    " "+
    "     where   transactionline.itemtype='InvtPart'       "+
    "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')    and transactionline.location in ("+location+")      "+
    "    and transaction .type='SalesOrd'  and terms not  in(4,20 ) group by   transactionline.item,item.description)as  valor_2_para__el_5 on total_Ingresos.itm=valor_2_para__el_5.itm left join  "+
    "  (SELECT       "+
    "  sum(netamount)  DEVOLUCIONES,   transactionline.item itm ,item.description  desc "+
    "  FROM     "+
    "   transaction join transactionline on transactionline.transaction=transaction.id   "+
    "join item on  transactionline.item=item .id    "+
    "    where   transactionline.itemtype='InvtPart'        "+
    "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      AND      "+
    "  transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') and transactionline.location in ("+location+") and transaction .type in ('CustCred')  "+
    "  group by  transactionline.item,item.description)  as  DEVOLUCIONES on total_Ingresos.itm=DEVOLUCIONES.itm   left join  "+
    
    
    
    
    
    
    
    
    
    "  (Select ROUND(sum(CostoTotal),2)*-1 CostoTotal,desc articulo,itm itm  from    "+
    "  (SELECT       "+
    
    
    "  ROUND(quantity,2)* ROUND(costestimaterate,2)  CostoTotal,  transactionline.item itm,item.description desc    "+
    "    FROM      "+
    "     transaction join transactionline on transactionline.transaction=transaction.id   "+
    "     join item on  transactionline.item=item .id     "+
    " where   transactionline.itemtype='InvtPart'       "+
    "      AND transaction .tranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')       AND       "+
    "    transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  and transactionline.location in ("+location+")   and transaction .type in ('SalesOrd') ) group by  desc,itm )as  CostoTotal on total_Ingresos.itm=CostoTotal.itm  left join "  +
    
    
    
    
    
    
    "  (Select ROUND(sum(DEVOLUCIONES_Compra),2)*1 DEVOLUCIONES_Compra,desc articulo,itm itm  from    "+
    "  (SELECT       "+
    
    
    "  ROUND(quantity,2)* ROUND(costestimaterate,2)  DEVOLUCIONES_Compra,  transactionline.item itm,item.description desc    "+
    "    FROM      "+
    "     transaction join transactionline on transactionline.transaction=transaction.id   "+
    "     join item on  transactionline.item=item .id     "+
    " where   transactionline.itemtype='InvtPart'       "+
    "      AND transaction .tranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')       AND       "+
    "    transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  and transactionline.location in ("+location+")   and transaction .type in ('CustCred') ) group by  desc,itm )as  DEVOLUCIONES_Compra on total_Ingresos.itm=DEVOLUCIONES_Compra.itm   union all " + 
    
    
    
    "  SELECT       "+
    "  transactionline.item,item.description articulo,0,sum(netamount)*-1 Venta_neta ,0,0  "+
    "  FROM     "+
    "   transaction join transactionline on transactionline.transaction=transaction.id  "+
    "join item on  transactionline.item=item .id    "+
    "      where   transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      AND      "+
    "  transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') and transactionline.location in ("+location+") and transaction .type in ('CustCred')  and  custbody_bex_tiponc  in (1)       "+ 
    "  and transactionline.item = 19012     "+
    "  group by   transactionline.item,item.description  )) N2 join item on N2.itm=item.id left join  customrecord681 on  item.custitem15=customrecord681.id "
    
  */
  
  }
  
  if(customrecord688==9){
     
    var sqlPrincipal= 
    "select*from(SELECT      "+
    "  sum(netamount)*-1 total_Ingresos ,  ROUND(sum(quantity),2) cantidad, transaction .entity itm, "+
    "  FROM      "+
    "    transaction join transactionline on transactionline.transaction=transaction.id    "+
    
    " "+
    "      where   transactionline.itemtype='InvtPart'      "+
    "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      "+
    " AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')      "+
    "    and transactionline.location in ("+location+") and transaction .type='SalesOrd' group by transaction .entity ) as  total_Ingresos  " +

    " left join   (select      "+
    "   sum(netamount)*-1 valor_1_para__el_5  ,   transaction .entity itm "+
    "  FROM      "+
    "   transaction join transactionline on transactionline.transaction=transaction.id   "+
    "join item on  transactionline.item=item .id   "+
    "     where   transactionline.itemtype='InvtPart'       "+
    "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')    and transactionline.location in ("+location+")      "+
    "    and transaction .type='SalesOrd'  and terms not  in(4,20 ) group by transaction .entity ) as  valor_1_para__el_5 on total_Ingresos.itm=valor_1_para__el_5.itm   "

    " "+
    "    (select      "+
    "   sum(netamount)*.95 valor_2_para__el_5,   transaction .entity itm,item.description  desc "+
    "  FROM      "+
    "   transaction join transactionline on transactionline.transaction=transaction.id   "+
    
    " "+
    "     where   transactionline.itemtype='InvtPart'       "+
    "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')    and transactionline.location in ("+location+")      "+
    "    and transaction .type='SalesOrd'  and terms not  in(4,20 ) group by transaction .entity )as  valor_2_para__el_5 on total_Ingresos.itm=valor_2_para__el_5.itm left join  "+ 
    "  (SELECT       "+
    "  sum(netamount)  DEVOLUCIONES,   transaction .entity itm ,item.description  desc "+
    "  FROM     "+
    "   transaction join transactionline on transactionline.transaction=transaction.id   "+
    
    "    where   transactionline.itemtype='InvtPart'        "+
    "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      AND      "+
    "  transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') and transactionline.location in ("+location+") and transaction .type in ('CustCred')  "+
    "  group by transaction .entity   as  DEVOLUCIONES on total_Ingresos.itm=DEVOLUCIONES.itm   left join  "+ 
    
    
    
    
    
    
    
    
    
    "  (Select ROUND(sum(CostoTotal),2)*-1 CostoTotal,itm itm  from    "+
    "  (SELECT       "+
    
    
    "  ROUND(quantity,2)* ROUND(costestimaterate,2)  CostoTotal,  transaction .entity itm  "+
    "    FROM      "+
    "     transaction join transactionline on transactionline.transaction=transaction.id   "+
    "     join item on  transactionline.item=item .id     "+
    " where   transactionline.itemtype='InvtPart'       "+
    "      AND transaction .tranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')       AND       "+
    "    transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  and transactionline.location in ("+location+")   and transaction .type in ('SalesOrd') ) group by transaction .entity esos.itm=CostoTotal.itm  left join "  + 
    
    
    
    
    
    
    "  (Select ROUND(sum(DEVOLUCIONES_Compra),2)*1 DEVOLUCIONES_Compra,itm itm  from    "+
    "  (SELECT       "+
    
    
    "  ROUND(quantity,2)* ROUND(costestimaterate,2)  DEVOLUCIONES_Compra,  transaction .entity itm    "+
    "    FROM      "+
    "     transaction join transactionline on transactionline.transaction=transaction.id   "+
    "     join item on  transactionline.item=item .id     "+
    " where   transactionline.itemtype='InvtPart'       "+
    "      AND transaction .tranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')       AND       "+
    "    transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  and transactionline.location in ("+location+")   and transaction .type in ('CustCred') ) group by transaction .entity otal_Ingresos.itm=DEVOLUCIONES_Compra.itm   " 
    
    
    
    "  SELECT       "+
    "  transaction .entity,0,sum(netamount)*-1 Venta_neta ,0,0  "+
    "  FROM     "+
    "   transaction join transactionline on transactionline.transaction=transaction.id  "+
    
    "      where   transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      AND      "+
    "  transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') and transactionline.location in ("+location+") and transaction .type in ('CustCred')  and  custbody_bex_tiponc  in (1)       "+ 
    "  and transactionline.item = 19012     "+
    "  group by transaction .entity   )" 
    
    
  
  
  
  
  
  }
  if(customrecord688==10){
   var sqlPrincipal= " select transaccion trlcom,Proveedor,((sum(compra)*.16)+sum(compra)) compra ,ROUND (((sum(compra)*.16)+sum(compra))-((((sum(compra)*.16)+sum(compra)) /sum(pedido))*sum(restante)) ,2) Monto_recibido,ROUND ((ROUND (((sum(compra)*.16)+sum(compra))-((((sum(compra)*.16)+sum(compra)) /sum(pedido))*sum(restante)) ,2)/((sum(compra)*.16)+sum(compra)))*100) porcentual_de_efectividad ,ROUND ((((sum(compra)*.16)+sum(compra)) /sum(pedido))*sum(restante) ,2)  restante_de_compra ,entityid comprador,Estatus, sum(pedido) pedido,sum(recibido) recibido,(sum(recibido)/ NULLIF(sum(pedido),0))*100 porcentaje_de_efectividad    ,sum(restante) restante, fecha ,idtransaccion from(select transaccion,Proveedor,compra,Estatus,pedido, CASE WHEN pedido<recibido  THEN  pedido  ELSE recibido END AS recibido     ,   CASE WHEN pedido<recibido  THEN  0  ELSE  pedido- recibido END AS    restante ,fecha,entityid ,idtransaccion  from (SELECT  id idtransaccion,tranid transaccion, Proveedor,compra,Estatus,  description,ROUND(pedido) pedido,CASE WHEN SUM(recibido) IS NULL THEN 0 ELSE ROUND(SUM(recibido)/2) END AS recibido, fecha,entityid"+
  
  " FROM ( "+
  "     SELECT  consultatot.entityid,consultatot.compra,consultatot.fecha, "+
  "         consultatot.Estatus, "+
  "         consultatot.Proveedor, "+
  "         consultatot.id, "+
  "         consultatot.description, "+
  
  "         consultatot.tranid, "+
  "         consultatot.item AS articulo, "+
  "         consultatot.pedido, "+
  "         COALESCE(transactionline.quantity, 0) AS recibido "+
  "     FROM ( "+
  "         SELECT   transaction.id, employee.entityid,,transactionline. netamount compra,transaction.createddate fecha, "  +
  "             TransactionStatus.fullname AS Estatus, "+
  "             Vendor.companyname AS Proveedor, "+
  "             item.description, "+
  "             transaction.tranid, "+
  
  "             transactionline.quantity AS pedido, "+
  "             transactionline.item, "+
  "             transactionline.quantity AS recibido "+
  "         FROM "+
  "             transaction "+
  "           left JOIN transactionline ON transactionline.transaction = transaction.id "+
  "           left JOIN TransactionStatus ON transaction.status = TransactionStatus.id AND TransactionStatus.trantype = transaction.type "+
  "           left JOIN item ON transactionline.item = item.id "+
  "           left JOIN Vendor ON Vendor.id = transaction.entity  "+
  "           left join employee on transaction.custbody_bex_comprador=employee .id  "+
  
  
  
  "         WHERE "+
  "             transactionline.quantity >= 0  "+
  "             AND  transactionline.itemtype='InvtPart'  AND transaction.trandate <> TO_DATE('03/08/2024', 'MM/DD/YYYY')   AND transaction.trandate <> TO_DATE('02/09/2024', 'MM/DD/YYYY') AND transaction.trandate <> TO_DATE('02/13/2024', 'MM/DD/YYYY')  AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')    AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')     and  "+
  " transactionline.location in ("+location+")  and transaction .type='PurchOrd'  and TransactionStatus.id in('B','D','E','F','G','H')   "+
  "     ) consultatot "+
  "     LEFT JOIN transactionline ON transactionline.createdfrom = consultatot.id AND consultatot.item = transactionline.item "+
  "     LEFT JOIN transaction ON transactionline.transaction = transaction.id AND transaction.type = 'ItemRcpt' "+
  " ) AS subconsulta "+
  " GROUP BY "+
  "     articulo, pedido, tranid, description, id, Proveedor, Estatus,fecha,compra,entityid )order by    fecha ) group by transaccion,Proveedor,Estatus,fecha,entityid,idtransaccion "
  
  }
  
  //
  
  
  if(customrecord688==2){
  
  
     var dias1432 =Dias_diferencia(f_Inicio, f_Final);
              var dias143222 =contarDomingos(f_Inicio, f_Final);
        var ff111=Dias_diferencia(f_Inicio, f_Final);
            var valor_dedia=0
      if(dias1432==0){
        valor_dedia=1
      }else(
  valor_dedia=((dias1432*2)-dias143222)+2
        )
  
  if(valproov2!=0){
  
     if(location !="2,4,5,6,1,3,23"){
  var sqlPrincipal="select   codigo_articulo,articulo,tot_vtas,cantidad,stk_disponible,stk_disponible_valor,Precio_Promedio,ROUND(((COALESCE(NULLIF(cost_prom,0)/NULLIF(Precio_Promedio,0),0))-1)*-100,0) utilidad,cost_prom,codigo proveedor  , ROUND(stk_disponible_valor/NULLIF( tot_vtas/" + Math.round(valor_dedia) + ",0))  Dias_de_inventario_pesos, ROUND(stk_disponible/NULLIF( cantidad/" + Math.round(valor_dedia) + ",0))  Dias_de_inventario_piezas   from( SELECT  t3.codigo,t3.codigo_articulo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+ 
  " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  "+
  "  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,   "+
  "    ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible,   "+
  "     ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,   "+
  "     COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio,   "+
  "      COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom ,  "+
  "       COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) /NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia,,  "+
  "        FROM(           "+
  "          SELECT  "+
  "          Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene,    "+
  "         SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta,     "+
  "        item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )  "+
  "        INNER JOIN location AS Ubicacion          "+
  "        ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND           "+
  "                                SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND    "+
  "                                            ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in("+location+") ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1           "+
  "                                             FULL OUTER JOIN(          "+
  "        SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id    "+
  "        THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,    "+
  "        item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) "+
  "         INNER JOIN location AS Ubicacion ON "+
  "          ( SOLine.location= Ubicacion.id )     "+
  "                      INNER JOIN Item ON ( Item.ID = SOLine.Item )  "+
  "                      LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id  "+
  "                      left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND             "+
  "                           ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')    AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) "+
  "                            AND ( Item.ItemType <> 'Discount' )                   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  "+
  "                            AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in("+location+") )  "+
  "                            GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)          t2 ON t2.articulo=t1.articulo           "+
  "                             FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo          "+
  "                                  ,codigo_articulo from (SELECT NCP.name as codigo,articulo.displayname codigo_articulo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal,        "+
  "                                         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo "+
  "                                          JOIN inventoryitemlocations AS ubicacion_inventario     "+
  "                                                    ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location "+
  "                                                      JOIN CUSTOMRECORD671 NCP on  articulo.custitem10=NCP.id "+
  "                                                     WHERE ubicacion_inventario.location in("+location+")   and NCP.id="+proov2+"  and NCP.name is not null  )          "+
  "                                                        group by sucursalid,articulo,sucursal,codigo,codigo_articulo)t3 ON t3.articulo=t1.articulo           WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR          "+
  "                                                            (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR             "+
  "                                                             (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)       "+
  "                                                                  GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo,t3.codigo_articulo order by tot_vtas desc  )  where codigo  is not null   " 
  }
  else{
  
  var sqlPrincipal=" select codigo_articulo,articulo  ,sum(tot_vtas) tot_vtas,sum(cantidad)cantidad,sum(stk_disponible) stk_disponible,sum(stk_disponible_valor) stk_disponible_valor, "+
  " COALESCE(sum(tot_vtas) /NULLIF(sum(cantidad),0),0) Precio_Promedio,ROUND(((COALESCE(NULLIF(COALESCE(sum(stk_disponible_valor)/NULLIF(sum(stk_disponible),0),0) ,0)/NULLIF(COALESCE(sum(tot_vtas) /NULLIF(sum(cantidad),0),0),0),0))-1)*-100,0) utilidad,COALESCE(sum(stk_disponible_valor)/NULLIF(sum(stk_disponible),0),0) cost_prom,"+
  " codigo proveedor "+
  ", ROUND(sum(stk_disponible_valor)/NULLIF( sum(tot_vtas)/" + Math.round(valor_dedia) + ",0))  Dias_de_inventario_pesos, "+
  " ROUND(sum(stk_disponible)/NULLIF( sum(cantidad)/" + Math.round(valor_dedia) + ",0))  Dias_de_inventario_piezas  "+
  
  
  "from(select  * from( SELECT  t3.codigo,t3.codigo_articulo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+ 
  " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  "+
  "  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,   "+
  "    ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible,   "+
  "     ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,   "+
  "     COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio,   "+
  "      COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom ,  "+
  "       COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) /NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia,,  "+
  "        FROM(           "+
  "          SELECT  "+
  "          Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene,    "+
  "         SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta,     "+
  "        item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )  "+
  "        INNER JOIN location AS Ubicacion          "+
  "        ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND           "+
  "                                SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND    "+
  "                                            ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(2) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1           "+
  "                                             FULL OUTER JOIN(          "+
  "        SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id    "+
  "        THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,    "+
  "        item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) "+
  "         INNER JOIN location AS Ubicacion ON "+
  "          ( SOLine.location= Ubicacion.id )     "+
  "                      INNER JOIN Item ON ( Item.ID = SOLine.Item )  "+
  "                      LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id  "+
  "                      left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND             "+
  "                           ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')    AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) "+
  "                            AND ( Item.ItemType <> 'Discount' )                   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  "+
  "                            AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(2) )  "+
  "                            GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)          t2 ON t2.articulo=t1.articulo           "+
  "                             FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo          "+
  "                                  ,codigo_articulo from (SELECT NCP.name as codigo,articulo.displayname codigo_articulo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal,        "+
  "                                         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo "+
  "                                          JOIN inventoryitemlocations AS ubicacion_inventario     "+
  "                                                    ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location "+
  "                                                      JOIN CUSTOMRECORD671 NCP on  articulo.custitem10=NCP.id "+
  "                                                     WHERE ubicacion_inventario.location in(2)   and NCP.id="+proov2+"  and NCP.name is not null  )          "+
  "                                                        group by sucursalid,articulo,sucursal,codigo,codigo_articulo)t3 ON t3.articulo=t1.articulo           WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR          "+
  "                                                            (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR             "+
  "                                                             (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)       "+
  "                                                                  GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo,t3.codigo_articulo order by tot_vtas desc )   where codigo is not null   union all " +
  
  
   
  
  
  
  
   " select  * from( SELECT  t3.codigo,t3.codigo_articulo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+ 
  " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  "+
  "  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,   "+
  "    ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible,   "+
  "     ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,   "+
  "     COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio,   "+
  "      COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom ,  "+
  "       COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) /NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia,,  "+
  "        FROM(           "+
  "          SELECT  "+
  "          Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene,    "+
  "         SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta,     "+
  "        item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )  "+
  "        INNER JOIN location AS Ubicacion          "+
  "        ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND           "+
  "                                SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND    "+
  "                                            ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(4) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1           "+
  "                                             FULL OUTER JOIN(          "+
  "        SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id    "+
  "        THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,    "+
  "        item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) "+
  "         INNER JOIN location AS Ubicacion ON "+
  "          ( SOLine.location= Ubicacion.id )     "+
  "                      INNER JOIN Item ON ( Item.ID = SOLine.Item )  "+
  "                      LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id  "+
  "                      left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND             "+
  "                           ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')    AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) "+
  "                            AND ( Item.ItemType <> 'Discount' )                   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  "+
  "                            AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(4) )  "+
  "                            GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)          t2 ON t2.articulo=t1.articulo           "+
  "                             FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo          "+
  "                                  ,codigo_articulo from (SELECT NCP.name as codigo,articulo.displayname codigo_articulo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal,        "+
  "                                         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo "+
  "                                          JOIN inventoryitemlocations AS ubicacion_inventario     "+
  "                                                    ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location "+
  "                                                      JOIN CUSTOMRECORD671 NCP on  articulo.custitem10=NCP.id "+
  "                                                     WHERE ubicacion_inventario.location in(4)   and NCP.id="+proov2+"  and NCP.name is not null  )          "+
  "                                                        group by sucursalid,articulo,sucursal,codigo,codigo_articulo)t3 ON t3.articulo=t1.articulo           WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR          "+
  "                                                            (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR             "+
  "                                                             (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)       "+
  "                                                                  GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo,t3.codigo_articulo order by tot_vtas desc )     where codigo is not null   union all " +
  
  
  
  
  
  
   " select  * from( SELECT  t3.codigo,t3.codigo_articulo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+ 
  " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  "+
  "  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,   "+
  "    ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible,   "+
  "     ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,   "+
  "     COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio,   "+
  "      COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom ,  "+
  "       COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) /NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia,,  "+
  "        FROM(           "+
  "          SELECT  "+
  "          Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene,    "+
  "         SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta,     "+
  "        item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )  "+
  "        INNER JOIN location AS Ubicacion          "+
  "        ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND           "+
  "                                SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND    "+
  "                                            ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(5) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1           "+
  "                                             FULL OUTER JOIN(          "+
  "        SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id    "+
  "        THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,    "+
  "        item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) "+
  "         INNER JOIN location AS Ubicacion ON "+
  "          ( SOLine.location= Ubicacion.id )     "+
  "                      INNER JOIN Item ON ( Item.ID = SOLine.Item )  "+
  "                      LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id  "+
  "                      left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND             "+
  "                           ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')    AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) "+
  "                            AND ( Item.ItemType <> 'Discount' )                   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  "+
  "                            AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(5) )  "+
  "                            GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)          t2 ON t2.articulo=t1.articulo           "+
  "                             FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo          "+
  "                                  ,codigo_articulo from (SELECT NCP.name as codigo,articulo.displayname codigo_articulo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal,        "+
  "                                         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo "+
  "                                          JOIN inventoryitemlocations AS ubicacion_inventario     "+
  "                                                    ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location "+
  "                                                      JOIN CUSTOMRECORD671 NCP on  articulo.custitem10=NCP.id "+
  "                                                     WHERE ubicacion_inventario.location in(5)   and NCP.id="+proov2+"  and NCP.name is not null  )          "+
  "                                                        group by sucursalid,articulo,sucursal,codigo,codigo_articulo)t3 ON t3.articulo=t1.articulo           WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR          "+
  "                                                            (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR             "+
  "                                                             (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)       "+
  "                                                                  GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo,t3.codigo_articulo order by tot_vtas desc )     where codigo is not null   union all " +
  
  
  
  
  
   " select  * from( SELECT  t3.codigo,t3.codigo_articulo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+ 
  " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  "+
  "  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,   "+
  "    ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible,   "+
  "     ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,   "+
  "     COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio,   "+
  "      COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom ,  "+
  "       COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) /NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia,,  "+
  "        FROM(           "+
  "          SELECT  "+
  "          Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene,    "+
  "         SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta,     "+
  "        item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )  "+
  "        INNER JOIN location AS Ubicacion          "+
  "        ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND           "+
  "                                SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND    "+
  "                                            ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(6) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1           "+
  "                                             FULL OUTER JOIN(          "+
  "        SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id    "+
  "        THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,    "+
  "        item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) "+
  "         INNER JOIN location AS Ubicacion ON "+
  "          ( SOLine.location= Ubicacion.id )     "+
  "                      INNER JOIN Item ON ( Item.ID = SOLine.Item )  "+
  "                      LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id  "+
  "                      left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND             "+
  "                           ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')    AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) "+
  "                            AND ( Item.ItemType <> 'Discount' )                   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  "+
  "                            AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(6) )  "+
  "                            GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)          t2 ON t2.articulo=t1.articulo           "+
  "                             FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo          "+
  "                                  ,codigo_articulo from (SELECT NCP.name as codigo,articulo.displayname codigo_articulo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal,        "+
  "                                         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo "+
  "                                          JOIN inventoryitemlocations AS ubicacion_inventario     "+
  "                                                    ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location "+
  "                                                      JOIN CUSTOMRECORD671 NCP on  articulo.custitem10=NCP.id "+
  "                                                     WHERE ubicacion_inventario.location in(6)   and NCP.id="+proov2+"  and NCP.name is not null  )          "+
  "                                                        group by sucursalid,articulo,sucursal,codigo,codigo_articulo)t3 ON t3.articulo=t1.articulo           WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR          "+
  "                                                            (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR             "+
  "                                                             (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)       "+
  "                                                                  GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo,t3.codigo_articulo order by tot_vtas desc )     where codigo is not null   union all " +
  
  
  
  
   " select  * from( SELECT  t3.codigo,t3.codigo_articulo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+ 
  " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  "+
  "  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,   "+
  "    ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible,   "+
  "     ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,   "+
  "     COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio,   "+
  "      COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom ,  "+
  "       COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) /NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia,,  "+
  "        FROM(           "+
  "          SELECT  "+
  "          Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene,    "+
  "         SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta,     "+
  "        item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )  "+
  "        INNER JOIN location AS Ubicacion          "+
  "        ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND           "+
  "                                SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND    "+
  "                                            ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(1) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1           "+
  "                                             FULL OUTER JOIN(          "+
  "        SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id    "+
  "        THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,    "+
  "        item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) "+
  "         INNER JOIN location AS Ubicacion ON "+
  "          ( SOLine.location= Ubicacion.id )     "+
  "                      INNER JOIN Item ON ( Item.ID = SOLine.Item )  "+
  "                      LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id  "+
  "                      left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND             "+
  "                           ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')    AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) "+
  "                            AND ( Item.ItemType <> 'Discount' )                   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  "+
  "                            AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(1) )  "+
  "                            GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)          t2 ON t2.articulo=t1.articulo           "+
  "                             FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo          "+
  "                                  ,codigo_articulo from (SELECT NCP.name as codigo,articulo.displayname codigo_articulo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal,        "+
  "                                         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo "+
  "                                          JOIN inventoryitemlocations AS ubicacion_inventario     "+
  "                                                    ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location "+
  "                                                      JOIN CUSTOMRECORD671 NCP on  articulo.custitem10=NCP.id "+
  "                                                     WHERE ubicacion_inventario.location in(1)   and NCP.id="+proov2+"  and NCP.name is not null  )          "+
  "                                                        group by sucursalid,articulo,sucursal,codigo,codigo_articulo)t3 ON t3.articulo=t1.articulo           WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR          "+
  "                                                            (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR             "+
  "                                                             (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)       "+
  "                                                                  GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo,t3.codigo_articulo order by tot_vtas desc )     where codigo is not null   union all " +
  
  
  
  
   " select  * from( SELECT  t3.codigo,t3.codigo_articulo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+ 
  " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  "+
  "  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,   "+
  "    ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible,   "+
  "     ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,   "+
  "     COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio,   "+
  "      COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom ,  "+
  "       COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) /NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia,,  "+
  "        FROM(           "+
  "          SELECT  "+
  "          Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene,    "+
  "         SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta,     "+
  "        item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )  "+
  "        INNER JOIN location AS Ubicacion          "+
  "        ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND           "+
  "                                SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND    "+
  "                                            ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(3) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1           "+
  "                                             FULL OUTER JOIN(          "+
  "        SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id    "+
  "        THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,    "+
  "        item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) "+
  "         INNER JOIN location AS Ubicacion ON "+
  "          ( SOLine.location= Ubicacion.id )     "+
  "                      INNER JOIN Item ON ( Item.ID = SOLine.Item )  "+
  "                      LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id  "+
  "                      left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND             "+
  "                           ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')    AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) "+
  "                            AND ( Item.ItemType <> 'Discount' )                   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  "+
  "                            AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(3) )  "+
  "                            GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)          t2 ON t2.articulo=t1.articulo           "+
  "                             FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo          "+
  "                                  ,codigo_articulo from (SELECT NCP.name as codigo,articulo.displayname codigo_articulo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal,        "+
  "                                         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo "+
  "                                          JOIN inventoryitemlocations AS ubicacion_inventario     "+
  "                                                    ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location "+
  "                                                      JOIN CUSTOMRECORD671 NCP on  articulo.custitem10=NCP.id "+
  "                                                     WHERE ubicacion_inventario.location in(3)   and NCP.id="+proov2+"  and NCP.name is not null  )          "+
  "                                                        group by sucursalid,articulo,sucursal,codigo,codigo_articulo)t3 ON t3.articulo=t1.articulo           WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR          "+
  "                                                            (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR             "+
  "                                                             (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)       "+
  "                                                                  GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo,t3.codigo_articulo order by tot_vtas desc )     where codigo is not null   union all " +
  
  
  
  
  
  
   " select  * from( SELECT  t3.codigo,t3.codigo_articulo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+ 
  " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  "+
  "  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,   "+
  "    ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible,   "+
  "     ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,   "+
  "     COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio,   "+
  "      COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom ,  "+
  "       COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) /NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia,,  "+
  "        FROM(           "+
  "          SELECT  "+
  "          Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene,    "+
  "         SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta,     "+
  "        item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )  "+
  "        INNER JOIN location AS Ubicacion          "+
  "        ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND           "+
  "                                SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND    "+
  "                                            ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(23) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1           "+
  "                                             FULL OUTER JOIN(          "+
  "        SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id    "+
  "        THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,    "+
  "        item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) "+
  "         INNER JOIN location AS Ubicacion ON "+
  "          ( SOLine.location= Ubicacion.id )     "+
  "                      INNER JOIN Item ON ( Item.ID = SOLine.Item )  "+
  "                      LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id  "+
  "                      left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND             "+
  "                           ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')    AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) "+
  "                            AND ( Item.ItemType <> 'Discount' )                   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  "+
  "                            AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(23) )  "+
  "                            GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)          t2 ON t2.articulo=t1.articulo           "+
  "                             FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo          "+
  "                                  ,codigo_articulo from (SELECT NCP.name as codigo,articulo.displayname codigo_articulo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal,        "+
  "                                         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo "+
  "                                          JOIN inventoryitemlocations AS ubicacion_inventario     "+
  "                                                    ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location "+
  "                                                      JOIN CUSTOMRECORD671 NCP on  articulo.custitem10=NCP.id "+
  "                                                     WHERE ubicacion_inventario.location in(23)   and NCP.id="+proov2+"  and NCP.name is not null  )          "+
  "                                                        group by sucursalid,articulo,sucursal,codigo,codigo_articulo)t3 ON t3.articulo=t1.articulo           WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR          "+
  "                                                            (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR             "+
  "                                                             (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)       "+
  "                                                                  GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo,t3.codigo_articulo order by tot_vtas desc ) where codigo is not null    )  group by codigo,articulo,codigo_articulo " 
  
  
  
  }
  
  }
  else{
  
     if(location !="2,4,5,6,1,3,23"){
  var sqlPrincipal="select  codigo_articulo,articulo,tot_vtas,cantidad,stk_disponible,stk_disponible_valor,Precio_Promedio,ROUND(((COALESCE(NULLIF(cost_prom,0)/NULLIF(Precio_Promedio,0),0))-1)*-100,0) utilidad,cost_prom,codigo proveedor,ROUND(stk_disponible_valor/NULLIF( tot_vtas/" + Math.round(valor_dedia) + ",0))  Dias_de_inventario_pesos, ROUND(stk_disponible/NULLIF( cantidad/" + Math.round(valor_dedia) + ",0))  Dias_de_inventario_piezas  from( SELECT  t3.codigo,t3.codigo_articulo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+ 
  " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  "+
  "  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,   "+
  "    ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible,   "+
  "     ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,   "+
  "     COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio,   "+
  "      COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom ,  "+
  "       COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) /NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia,,  "+
  "        FROM(           "+
  "          SELECT  "+
  "          Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene,    "+
  "         SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta,     "+
  "        item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )  "+
  "        INNER JOIN location AS Ubicacion          "+
  "        ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND           "+
  "                                SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND    "+
  "                                            ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in("+location+") ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1           "+
  "                                             FULL OUTER JOIN(          "+
  "        SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id    "+
  "        THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,    "+
  "        item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) "+
  "         INNER JOIN location AS Ubicacion ON "+
  "          ( SOLine.location= Ubicacion.id )     "+
  "                      INNER JOIN Item ON ( Item.ID = SOLine.Item )  "+
  "                      LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id  "+
  "                      left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND             "+
  "                           ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')    AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) "+
  "                            AND ( Item.ItemType <> 'Discount' )                   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  "+
  "                            AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in("+location+") )  "+
  "                            GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)          t2 ON t2.articulo=t1.articulo           "+
  "                             FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo          "+
  "                                  ,codigo_articulo from (SELECT NCP.name as codigo,articulo.displayname codigo_articulo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal,        "+
  "                                         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo "+
  "                                          JOIN inventoryitemlocations AS ubicacion_inventario     "+
  "                                                    ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location "+
  "                                                      JOIN CUSTOMRECORD671 NCP on  articulo.custitem10=NCP.id "+
  "                                                     WHERE ubicacion_inventario.location in("+location+")    and NCP.name is not null  )          "+
  "                                                        group by sucursalid,articulo,sucursal,codigo,codigo_articulo)t3 ON t3.articulo=t1.articulo           WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR          "+
  "                                                            (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR             "+
  "                                                             (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)       "+
  "                                                                  GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo,t3.codigo_articulo order by tot_vtas desc  )  where codigo  is not null   " 
  }
  else{
  
  
  var sqlPrincipal=" select codigo_articulo,articulo  ,sum(tot_vtas) tot_vtas,sum(cantidad)cantidad,sum(stk_disponible) stk_disponible,sum(stk_disponible_valor)+831.74 stk_disponible_valor, "+
  " COALESCE(sum(tot_vtas) /NULLIF(sum(cantidad),0),0) Precio_Promedio,ROUND(((COALESCE(NULLIF(COALESCE(sum(stk_disponible_valor)/NULLIF(sum(stk_disponible),0),0) ,0)/NULLIF(COALESCE(sum(tot_vtas) /NULLIF(sum(cantidad),0),0),0),0))-1)*-100,0) utilidad,COALESCE(sum(stk_disponible_valor)/NULLIF(sum(stk_disponible),0),0) cost_prom,"+
  "   ROUND(sum(stk_disponible_valor)/NULLIF( sum(tot_vtas)/" + Math.round(valor_dedia) + ",0))  Dias_de_inventario_pesos, ROUND(sum(stk_disponible)/NULLIF( sum(cantidad)/" + Math.round(valor_dedia) + ",0))  Dias_de_inventario_piezas,codigo proveedor   "+
  
  
  "from(select  * from( SELECT  t3.codigo,t3.codigo_articulo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+ 
  " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  "+
  "  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,   "+
  "    ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible,   "+
  "     ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,   "+
  "     COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio,   "+
  "      COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom ,  "+
  "       COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) /NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia,,  "+
  "        FROM(           "+
  "          SELECT  "+
  "          Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene,    "+
  "         SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta,     "+
  "        item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )  "+
  "        INNER JOIN location AS Ubicacion          "+
  "        ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND           "+
  "                                SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND    "+
  "                                            ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(2) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1           "+
  "                                             FULL OUTER JOIN(          "+
  "        SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id    "+
  "        THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,    "+
  "        item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) "+
  "         INNER JOIN location AS Ubicacion ON "+
  "          ( SOLine.location= Ubicacion.id )     "+
  "                      INNER JOIN Item ON ( Item.ID = SOLine.Item )  "+
  "                      LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id  "+
  "                      left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND             "+
  "                           ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')    AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) "+
  "                            AND ( Item.ItemType <> 'Discount' )                   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  "+
  "                            AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(2) )  "+
  "                            GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)          t2 ON t2.articulo=t1.articulo           "+
  "                             FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo          "+
  "                                  ,codigo_articulo from (SELECT NCP.name as codigo,articulo.displayname codigo_articulo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal,        "+
  "                                         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo "+
  "                                          JOIN inventoryitemlocations AS ubicacion_inventario     "+
  "                                                    ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location "+
  "                                                      JOIN CUSTOMRECORD671 NCP on  articulo.custitem10=NCP.id "+
  "                                                     WHERE ubicacion_inventario.location in(2)    and NCP.name is not null  )          "+
  "                                                        group by sucursalid,articulo,sucursal,codigo,codigo_articulo)t3 ON t3.articulo=t1.articulo           WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR          "+
  "                                                            (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR             "+
  "                                                             (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)       "+
  "                                                                  GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo,t3.codigo_articulo order by tot_vtas desc )     union all " +
  
  
   
  
  
  
  
   " select  * from( SELECT  t3.codigo,t3.codigo_articulo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+ 
  " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  "+
  "  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,   "+
  "    ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible,   "+
  "     ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,   "+
  "     COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio,   "+
  "      COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom ,  "+
  "       COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) /NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia,,  "+
  "        FROM(           "+
  "          SELECT  "+
  "          Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene,    "+
  "         SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta,     "+
  "        item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )  "+
  "        INNER JOIN location AS Ubicacion          "+
  "        ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND           "+
  "                                SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND    "+
  "                                            ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(4) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1           "+
  "                                             FULL OUTER JOIN(          "+
  "        SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id    "+
  "        THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,    "+
  "        item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) "+
  "         INNER JOIN location AS Ubicacion ON "+
  "          ( SOLine.location= Ubicacion.id )     "+
  "                      INNER JOIN Item ON ( Item.ID = SOLine.Item )  "+
  "                      LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id  "+
  "                      left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND             "+
  "                           ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')    AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) "+
  "                            AND ( Item.ItemType <> 'Discount' )                   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  "+
  "                            AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(4) )  "+
  "                            GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)          t2 ON t2.articulo=t1.articulo           "+
  "                             FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo          "+
  "                                  ,codigo_articulo from (SELECT NCP.name as codigo,articulo.displayname codigo_articulo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal,        "+
  "                                         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo "+
  "                                          JOIN inventoryitemlocations AS ubicacion_inventario     "+
  "                                                    ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location "+
  "                                                      JOIN CUSTOMRECORD671 NCP on  articulo.custitem10=NCP.id "+
  "                                                     WHERE ubicacion_inventario.location in(4)    and NCP.name is not null  )          "+
  "                                                        group by sucursalid,articulo,sucursal,codigo,codigo_articulo)t3 ON t3.articulo=t1.articulo           WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR          "+
  "                                                            (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR             "+
  "                                                             (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)       "+
  "                                                                  GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo,t3.codigo_articulo order by tot_vtas desc )     union all " +
  
  
  
  
  
  
   " select  * from( SELECT  t3.codigo,t3.codigo_articulo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+ 
  " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  "+
  "  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,   "+
  "    ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible,   "+
  "     ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,   "+
  "     COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio,   "+
  "      COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom ,  "+
  "       COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) /NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia,,  "+
  "        FROM(           "+
  "          SELECT  "+
  "          Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene,    "+
  "         SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta,     "+
  "        item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )  "+
  "        INNER JOIN location AS Ubicacion          "+
  "        ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND           "+
  "                                SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND    "+
  "                                            ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(5) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1           "+
  "                                             FULL OUTER JOIN(          "+
  "        SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id    "+
  "        THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,    "+
  "        item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) "+
  "         INNER JOIN location AS Ubicacion ON "+
  "          ( SOLine.location= Ubicacion.id )     "+
  "                      INNER JOIN Item ON ( Item.ID = SOLine.Item )  "+
  "                      LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id  "+
  "                      left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND             "+
  "                           ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')    AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) "+
  "                            AND ( Item.ItemType <> 'Discount' )                   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  "+
  "                            AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(5) )  "+
  "                            GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)          t2 ON t2.articulo=t1.articulo           "+
  "                             FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo          "+
  "                                  ,codigo_articulo from (SELECT NCP.name as codigo,articulo.displayname codigo_articulo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal,        "+
  "                                         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo "+
  "                                          JOIN inventoryitemlocations AS ubicacion_inventario     "+
  "                                                    ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location "+
  "                                                      JOIN CUSTOMRECORD671 NCP on  articulo.custitem10=NCP.id "+
  "                                                     WHERE ubicacion_inventario.location in(5)    and NCP.name is not null  )          "+
  "                                                        group by sucursalid,articulo,sucursal,codigo,codigo_articulo)t3 ON t3.articulo=t1.articulo           WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR          "+
  "                                                            (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR             "+
  "                                                             (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)       "+
  "                                                                  GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo,t3.codigo_articulo order by tot_vtas desc )     union all " +
  
  
  
  
  
   " select  * from( SELECT  t3.codigo,t3.codigo_articulo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+ 
  " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  "+
  "  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,   "+
  "    ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible,   "+
  "     ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,   "+
  "     COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio,   "+
  "      COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom ,  "+
  "       COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) /NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia,,  "+
  "        FROM(           "+
  "          SELECT  "+
  "          Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene,    "+
  "         SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta,     "+
  "        item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )  "+
  "        INNER JOIN location AS Ubicacion          "+
  "        ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND           "+
  "                                SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND    "+
  "                                            ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(6) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1           "+
  "                                             FULL OUTER JOIN(          "+
  "        SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id    "+
  "        THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,    "+
  "        item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) "+
  "         INNER JOIN location AS Ubicacion ON "+
  "          ( SOLine.location= Ubicacion.id )     "+
  "                      INNER JOIN Item ON ( Item.ID = SOLine.Item )  "+
  "                      LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id  "+
  "                      left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND             "+
  "                           ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')    AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) "+
  "                            AND ( Item.ItemType <> 'Discount' )                   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  "+
  "                            AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(6) )  "+
  "                            GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)          t2 ON t2.articulo=t1.articulo           "+
  "                             FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo          "+
  "                                  ,codigo_articulo from (SELECT NCP.name as codigo,articulo.displayname codigo_articulo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal,        "+
  "                                         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo "+
  "                                          JOIN inventoryitemlocations AS ubicacion_inventario     "+
  "                                                    ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location "+
  "                                                      JOIN CUSTOMRECORD671 NCP on  articulo.custitem10=NCP.id "+
  "                                                     WHERE ubicacion_inventario.location in(6)    and NCP.name is not null  )          "+
  "                                                        group by sucursalid,articulo,sucursal,codigo,codigo_articulo)t3 ON t3.articulo=t1.articulo           WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR          "+
  "                                                            (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR             "+
  "                                                             (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)       "+
  "                                                                  GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo,t3.codigo_articulo order by tot_vtas desc )     union all " +
  
  
  
  
   " select  * from( SELECT  t3.codigo,t3.codigo_articulo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+ 
  " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  "+
  "  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,   "+
  "    ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible,   "+
  "     ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,   "+
  "     COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio,   "+
  "      COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom ,  "+
  "       COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) /NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia,,  "+
  "        FROM(           "+
  "          SELECT  "+
  "          Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene,    "+
  "         SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta,     "+
  "        item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )  "+
  "        INNER JOIN location AS Ubicacion          "+
  "        ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND           "+
  "                                SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND    "+
  "                                            ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(1) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1           "+
  "                                             FULL OUTER JOIN(          "+
  "        SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id    "+
  "        THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,    "+
  "        item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) "+
  "         INNER JOIN location AS Ubicacion ON "+
  "          ( SOLine.location= Ubicacion.id )     "+
  "                      INNER JOIN Item ON ( Item.ID = SOLine.Item )  "+
  "                      LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id  "+
  "                      left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND             "+
  "                           ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')    AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) "+
  "                            AND ( Item.ItemType <> 'Discount' )                   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  "+
  "                            AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(1) )  "+
  "                            GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)          t2 ON t2.articulo=t1.articulo           "+
  "                             FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo          "+
  "                                  ,codigo_articulo from (SELECT NCP.name as codigo,articulo.displayname codigo_articulo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal,        "+
  "                                         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo "+
  "                                          JOIN inventoryitemlocations AS ubicacion_inventario     "+
  "                                                    ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location "+
  "                                                      JOIN CUSTOMRECORD671 NCP on  articulo.custitem10=NCP.id "+
  "                                                     WHERE ubicacion_inventario.location in(1)    and NCP.name is not null  )          "+
  "                                                        group by sucursalid,articulo,sucursal,codigo,codigo_articulo)t3 ON t3.articulo=t1.articulo           WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR          "+
  "                                                            (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR             "+
  "                                                             (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)       "+
  "                                                                  GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo,t3.codigo_articulo order by tot_vtas desc )     union all " +
  
  
  
  
   " select  * from( SELECT  t3.codigo,t3.codigo_articulo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+ 
  " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  "+
  "  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,   "+
  "    ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible,   "+
  "     ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,   "+
  "     COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio,   "+
  "      COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom ,  "+
  "       COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) /NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia,,  "+
  "        FROM(           "+
  "          SELECT  "+
  "          Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene,    "+
  "         SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta,     "+
  "        item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )  "+
  "        INNER JOIN location AS Ubicacion          "+
  "        ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND           "+
  "                                SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND    "+
  "                                            ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(3) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1           "+
  "                                             FULL OUTER JOIN(          "+
  "        SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id    "+
  "        THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,    "+
  "        item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) "+
  "         INNER JOIN location AS Ubicacion ON "+
  "          ( SOLine.location= Ubicacion.id )     "+
  "                      INNER JOIN Item ON ( Item.ID = SOLine.Item )  "+
  "                      LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id  "+
  "                      left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND             "+
  "                           ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')    AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) "+
  "                            AND ( Item.ItemType <> 'Discount' )                   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  "+
  "                            AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(3) )  "+
  "                            GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)          t2 ON t2.articulo=t1.articulo           "+
  "                             FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo          "+
  "                                  ,codigo_articulo from (SELECT NCP.name as codigo,articulo.displayname codigo_articulo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal,        "+
  "                                         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo "+
  "                                          JOIN inventoryitemlocations AS ubicacion_inventario     "+
  "                                                    ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location "+
  "                                                      JOIN CUSTOMRECORD671 NCP on  articulo.custitem10=NCP.id "+
  "                                                     WHERE ubicacion_inventario.location in(3)    and NCP.name is not null  )          "+
  "                                                        group by sucursalid,articulo,sucursal,codigo,codigo_articulo)t3 ON t3.articulo=t1.articulo           WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR          "+
  "                                                            (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR             "+
  "                                                             (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)       "+
  "                                                                  GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo,t3.codigo_articulo order by tot_vtas desc )     union all " +
  
  
  
  
  
  
   " select  * from( SELECT  t3.codigo,t3.codigo_articulo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+ 
  " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  "+
  "  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,   "+
  "    ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible,   "+
  "     ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,   "+
  "     COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio,   "+
  "      COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom ,  "+
  "       COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) /NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia,,  "+
  "        FROM(           "+
  "          SELECT  "+
  "          Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene,    "+
  "         SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta,     "+
  "        item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )  "+
  "        INNER JOIN location AS Ubicacion          "+
  "        ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND           "+
  "                                SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND    "+
  "                                            ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(23) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1           "+
  "                                             FULL OUTER JOIN(          "+
  "        SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id    "+
  "        THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,    "+
  "        item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) "+
  "         INNER JOIN location AS Ubicacion ON "+
  "          ( SOLine.location= Ubicacion.id )     "+
  "                      INNER JOIN Item ON ( Item.ID = SOLine.Item )  "+
  "                      LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id  "+
  "                      left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND             "+
  "                           ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')    AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) "+
  "                            AND ( Item.ItemType <> 'Discount' )                   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  "+
  "                            AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(23) )  "+
  "                            GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)          t2 ON t2.articulo=t1.articulo           "+
  "                             FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo          "+
  "                                  ,codigo_articulo from (SELECT NCP.name as codigo,articulo.displayname codigo_articulo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal,        "+
  "                                         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo "+
  "                                          JOIN inventoryitemlocations AS ubicacion_inventario     "+
  "                                                    ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location "+
  "                                                      JOIN CUSTOMRECORD671 NCP on  articulo.custitem10=NCP.id "+
  "                                                     WHERE ubicacion_inventario.location in(23)    and NCP.name is not null  )          "+
  "                                                        group by sucursalid,articulo,sucursal,codigo,codigo_articulo)t3 ON t3.articulo=t1.articulo           WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR          "+
  "                                                            (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR             "+
  "                                                             (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)       "+
  "                                                                  GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo,t3.codigo_articulo order by tot_vtas desc )   )  group by codigo,articulo,codigo_articulo " 
  
  //
  
  }
  
  }
  
  }
  if(customrecord688==11){

    var sqlPrincipal= "select consul1.*,consul2.compras_no_autorizadas,Round((Monto_recibido/compra)*100) porcentual_de_efectividad from(select comprador,sum(compra) compra,sum(Monto_recibido)Monto_recibido from( select transaccion trlcom,Proveedor,((sum(compra)*.16)+sum(compra)) compra ,ROUND (((sum(compra)*.16)+sum(compra))-((((sum(compra)*.16)+sum(compra)) /sum(pedido))*sum(restante)) ,2) Monto_recibido,ROUND ((ROUND (((sum(compra)*.16)+sum(compra))-((((sum(compra)*.16)+sum(compra)) /sum(pedido))*sum(restante)) ,2)/((sum(compra)*.16)+sum(compra)))*100) porcentual_de_efectividad ,ROUND ((((sum(compra)*.16)+sum(compra)) /sum(pedido))*sum(restante) ,2)  restante_de_compra ,entityid comprador,Estatus, sum(pedido) pedido,sum(recibido) recibido,(sum(recibido)/ NULLIF(sum(pedido),0))*100 porcentaje_de_efectividad    ,sum(restante) restante, fecha ,idtransaccion from(select transaccion,Proveedor,compra,Estatus,pedido, CASE WHEN pedido<recibido  THEN  pedido  ELSE recibido END AS recibido     ,   CASE WHEN pedido<recibido  THEN  0  ELSE  pedido- recibido END AS    restante ,fecha,entityid ,idtransaccion  from (SELECT  id idtransaccion,tranid transaccion, Proveedor,compra,Estatus,  description,ROUND(pedido) pedido,CASE WHEN SUM(recibido) IS NULL THEN 0 ELSE ROUND(SUM(recibido)/2) END AS recibido, fecha,entityid"+
  
    " FROM ( "+
    "     SELECT  consultatot.entityid,consultatot.compra,consultatot.fecha, "+
    "         consultatot.Estatus, "+
    "         consultatot.Proveedor, "+
    "         consultatot.id, "+
    "         consultatot.description, "+
    
    "         consultatot.tranid, "+
    "         consultatot.item AS articulo, "+
    "         consultatot.pedido, "+
    "         COALESCE(transactionline.quantity, 0) AS recibido "+
    "     FROM ( "+
    "         SELECT   transaction.id, employee.entityid,transactionline. netamount compra,transaction.createddate fecha, "  +
    "             TransactionStatus.fullname AS Estatus, "+
    "             Vendor.companyname AS Proveedor, "+
    "             item.description, "+
    "             transaction.tranid, "+
    
    "             transactionline.quantity AS pedido, "+
    "             transactionline.item, "+
    "             transactionline.quantity AS recibido "+
    "         FROM "+
    "             transaction "+
    "           left JOIN transactionline ON transactionline.transaction = transaction.id "+
    "           left JOIN TransactionStatus ON transaction.status = TransactionStatus.id AND TransactionStatus.trantype = transaction.type "+
    "           left JOIN item ON transactionline.item = item.id "+
    "           left JOIN Vendor ON Vendor.id = transaction.entity  "+
    "           left join employee on transaction.custbody_bex_comprador=employee .id  "+
    
    
    
    "         WHERE "+
    "             transactionline.quantity >= 0  "+
    "             AND  transactionline.itemtype='InvtPart' AND transaction.trandate <> TO_DATE('03/08/2024', 'MM/DD/YYYY')   AND transaction.trandate <> TO_DATE('02/09/2024', 'MM/DD/YYYY') AND transaction.trandate <> TO_DATE('02/13/2024', 'MM/DD/YYYY')  AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')    AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')     and  "+
    " transactionline.location in ("+location+")  and transaction .type='PurchOrd'  and TransactionStatus.id in('B','D','E','F','G','H')   "+
    "     ) consultatot "+
    "     LEFT JOIN transactionline ON transactionline.createdfrom = consultatot.id AND consultatot.item = transactionline.item "+
    "     LEFT JOIN transaction ON transactionline.transaction = transaction.id AND transaction.type = 'ItemRcpt' "+
    " ) AS subconsulta "+
    " GROUP BY "+
    "     articulo, pedido, tranid, description, id, Proveedor, Estatus,fecha,compra,entityid )order by    fecha )"+
    " group by transaccion,Proveedor,Estatus,fecha,entityid,idtransaccion ) group by comprador) consul1 left join   "+
    

 "(SELECT employee.entityid compradOR2 , "+
  "     sum(transactionline. netamount) compras_no_autorizadas,     "+
 
  "     FROM transaction "+
  " JOIN transactionline "+
  "     ON transactionline.transactiON = transaction.id "+  
  " JOIN employee "+
  "     ON transaction.custbody_bex_comprador=employee .id "+
  "     WHERE transactionline.quantity >= 0 "+
  "         AND transactionline.itemtype='InvtPart' "+
  "         AND transactiON .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')  "+
  "         AND transactiON .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
  "         AND transactionline.locatiON IN ("+location+")  "+
  "         AND transactiON .type='PurchOrd' "+
  "         AND transactiON.status ='A' group by employee.entityid) consul2 on consul1.comprador =consul2.compradOR2"
    


   var sqlPrincipal1= " SELECT consulta_1.*,consulta_2.compras_autorizadas  compras_no_autorizadas ,ROUND (NULLIF(consulta_1.monto_recibido /NULLIF(consulta_1.compras_autorizadas,0),0)*100,0) porcentaje_de_efectividad"+
  "     FROM (SELECT entityid compradOR , "+
  "         ((sum(compra)*.16)+sum(compra)) compras_autorizadas, "+
  "         ROUND ((((sum(compra)*.16)+sum(compra))-((((sum(compra)*.16)+sum(compra)) /sum(pedido))*sum(restante))) , "+
  "         2) Monto_recibido from(SELECT transaccion, "+
  "         Proveedor, "+
  "         compra, "+
  "         Estatus, "+
  "         pedido, "+
  "          "+
  "     CASE "+
  "     WHEN pedido<recibido THEN "+
  "     pedido "+
  "     ELSE recibido "+
  "     END AS recibido ,  "+
  "     CASE "+
  "     WHEN pedido<recibido THEN "+
  "     0 "+
  "     ELSE pedido- recibido "+
  "     END AS restante ,fecha,entityid "+
  "     FROM (SELECT tranid transaccion, "+
  "         Proveedor, "+
  "         compra, "+
  "         Estatus, "+
  "         description, "+
  "         ROUND(pedido) pedido, "+
  "          "+
  "     CASE "+
  "     WHEN SUM(recibido) IS NULL THEN "+
  "     0 "+
  "     ELSE ROUND(SUM(recibido)/2) "+
  "     END AS recibido, fecha,entityid "+
  "     FROM (SELECT consultatot.entityid, "+
  "         consultatot.compra, "+
  "         consultatot.fecha, "+
  "         consultatot.Estatus, "+
  "         consultatot.Proveedor, "+
  "         consultatot.id, "+
  "         consultatot.description, "+
  "         consultatot.tranid, "+
  "         consultatot.item AS articulo, "+
  "         consultatot.pedido, "+
  "         COALESCE(transactionline.quantity, "+
  "         0) AS recibido "+
  "     FROM (SELECT employee.entityid, "+
  "         , "+
  "         transactionline. netamount compra, "+
  "         transaction.createddate fecha, "+
  "         TransactionStatus.fullname AS Estatus, "+
  "         Vendor.companyname AS Proveedor, "+
  "         item.description, "+
  "         transaction.tranid, "+
  "         transaction.id, "+
  "         transactionline.quantity AS pedido, "+
  "         transactionline.item, "+
  "         transactionline.quantity AS recibido "+
  "     FROM transaction "+
  " JOIN transactionline "+
  "     ON transactionline.transactiON = transaction.id "+
  " JOIN TransactionStatus "+
  "     ON transaction.status = TransactionStatus.id "+
  "         AND TransactionStatus.trantype = transaction.type "+
  " JOIN item "+
  "     ON transactionline.item = item.id "+
  " JOIN Vendor "+
  "     ON Vendor.id = transaction.entity "+
  " JOIN employee "+
  "     ON transaction.custbody_bex_comprador=employee .id "+
  "     WHERE transactionline.quantity >= 0 "+
  "         AND transactionline.itemtype='InvtPart' and  transaction.trandate <> TO_DATE('02/09/2024', 'MM/DD/YYYY') AND transaction.trandate <> TO_DATE('02/13/2024', 'MM/DD/YYYY')"+
  "         AND transactiON .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')  "+
  "         AND transactiON .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
  "         AND transactionline.locatiON IN ("+location+")  "+
  "         AND transactiON .type='PurchOrd' "+
  "         AND TransactionStatus.id in('B','D','E','F','G','H') ) consultatot "+ 
  " LEFT JOIN transactionline "+
  "     ON transactionline.createdFROM = consultatot.id "+
  "         AND consultatot.item = transactionline.item "+
  " LEFT JOIN transaction "+
  "     ON transactionline.transactiON = transaction.id "+
  "         AND transaction.type = 'ItemRcpt' ) AS subconsulta "+
  "     GROUP BY  articulo, pedido, tranid, description, id, Proveedor, Estatus,fecha,compra,entityid )ORDER BY fecha ) "+
  "     GROUP BY  entityid) consulta_1  left  join  "+
  "  "+
  "  "+
  "     (SELECT entityid compradOR , "+
  "         ((sum(compra)*.16)+sum(compra)) compras_autorizadas, "+
  "         ROUND (((sum(compra)*.16)+sum(compra))-((((sum(compra)*.16)+sum(compra)) /sum(pedido))*sum(restante)) , "+
  "         2) Monto_recibido from(SELECT transaccion, "+
  "         Proveedor, "+
  "         compra, "+
  "         Estatus, "+
  "         pedido, "+
  "          "+
  "     CASE "+
  "     WHEN pedido<recibido THEN "+
  "     pedido "+
  "     ELSE recibido "+
  "     END AS recibido ,  "+
  "     CASE "+
  "     WHEN pedido<recibido THEN "+
  "     0 "+
  "     ELSE pedido- recibido "+
  "     END AS restante ,fecha,entityid "+
  "     FROM (SELECT tranid transaccion, "+
  "         Proveedor, "+
  "         compra, "+
  "         Estatus, "+
  "         description, "+
  "         ROUND(pedido) pedido, "+
  "          "+
  "     CASE "+
  "     WHEN SUM(recibido) IS NULL THEN "+
  "     0 "+
  "     ELSE ROUND(SUM(recibido)/2) "+
  "     END AS recibido, fecha,entityid "+
  "     FROM (SELECT consultatot.entityid, "+
  "         consultatot.compra, "+
  "         consultatot.fecha, "+
  "         consultatot.Estatus, "+
  "         consultatot.Proveedor, "+
  "         consultatot.id, "+
  "         consultatot.description, "+
  "         consultatot.tranid, "+
  "         consultatot.item AS articulo, "+
  "         consultatot.pedido, "+
  "         COALESCE(transactionline.quantity, "+
  "         0) AS recibido "+
  "     FROM (SELECT employee.entityid, "+
  "         , "+
  "         transactionline. netamount compra, "+
  "         transaction.createddate fecha, "+
  "         TransactionStatus.fullname AS Estatus, "+
  "         Vendor.companyname AS Proveedor, "+
  "         item.description, "+
  "         transaction.tranid, "+
  "         transaction.id, "+
  "         transactionline.quantity AS pedido, "+
  "         transactionline.item, "+
  "         transactionline.quantity AS recibido "+
  "     FROM transaction "+
  " JOIN transactionline "+
  "     ON transactionline.transactiON = transaction.id "+
  " JOIN TransactionStatus "+
  "     ON transaction.status = TransactionStatus.id "+
  "         AND TransactionStatus.trantype = transaction.type "+
  " JOIN item "+
  "     ON transactionline.item = item.id "+
  " JOIN Vendor "+
  "     ON Vendor.id = transaction.entity "+
  " JOIN employee "+
  "     ON transaction.custbody_bex_comprador=employee .id "+
  "     WHERE transactionline.quantity >= 0 "+
  "         AND transactionline.itemtype='InvtPart' "+
  "         AND transactiON .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')  "+
  "         AND transactiON .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
  "         AND transactionline.locatiON IN ("+location+")  "+
  "         AND transactiON .type='PurchOrd' "+
  "         AND TransactionStatus.id in('A') ) consultatot "+
  " LEFT JOIN transactionline "+
  "     ON transactionline.createdFROM = consultatot.id "+
  "         AND consultatot.item = transactionline.item "+
  " LEFT JOIN transaction "+
  "     ON transactionline.transactiON = transaction.id "+
  "         AND transaction.type = 'ItemRcpt' ) AS subconsulta "+
  "     GROUP BY  articulo, pedido, tranid, description, id, Proveedor, Estatus,fecha,compra,entityid )ORDER BY fecha ) "+
  "     GROUP BY  entityid)  consulta_2 on consulta_1.compradOR= consulta_2.compradOR "
  
  
  
  
  
  
  }
  if(customrecord688==12){
  
  
  
  
  
  
    ventadias=  "SUM( "+
            " CASE WHEN "+
            "   1 = 1 "+
            "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
            "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
            "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
            " THEN N1.stock * -1 "+
            " ELSE 0 "+
            " END) AS "+
            " cant_vta_pz, "+
            " ";
  
  
        ventadias2= "SUM( "+
            " CASE WHEN "+
            "   1 = 1 "+
            "   AND N1.IsInventoryAffecting = 'T' "+
            "   AND N1.Voided = 'F' "+
          
        
            " THEN n1.stock "+
            " ELSE 0 "+
            " END) AS "+
            "stock, "+
            " ";
  
          
            " ";
  
      
  var valor_cc=""
  
  
  
     var dias1432 =Dias_diferencia(f_Inicio, f_Final);
              var dias143222 =contarDomingos(f_Inicio, f_Final);
        var ff111=Dias_diferencia(f_Inicio, f_Final);
            var valor_dedia=0
      if(dias1432==0){
        valor_dedia=1
      }else(
  valor_dedia=((dias1432*2)-dias143222)+2
        )
       
        ventadias1=  "ROUND(SUM( "+
            " CASE WHEN "+
            "   1 = 1 "+
            "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
            "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
            "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
            " THEN N1.stock * -1 "+
            " ELSE 0 "+
            " END)/"+Math.round(valor_dedia)+" ,2) AS "+
            " d_d, "+
            " ";
  
  
        vtas_x_dia=  "ROUND(SUM( "+
            " CASE WHEN "+
            "   1 = 1 "+
            "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
            "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
            "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
            " THEN N1.stock * -1 "+
            " ELSE 0 "+
            " END)/"+Math.round(valor_dedia)+" ) AS "+
            " vtas_x_dia, "+
            " ";
  
  
        vdt22=  "  (ROUND(N1.stockDisponible)   /ROUND(SUM( "+
            " CASE WHEN "+
            "   1 = 1 "+
            "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
            "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
            "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
            " THEN N1.stock * -1 "+
            " ELSE 0 "+
            " END)/"+Math.round(valor_dedia)+")) AS "+
            " vdt22, "+
            " ";
  
  
  
  
  
  
  
  
   if(location !="2,4,5,6,1,3,23"){
  
  
  
  var sqlPrincipal="select codigo,articulo,tot_vtas,cantidad,stk_disponible,stk_disponible_valor,Precio_Promedio,ROUND(((COALESCE(NULLIF(cost_prom,0)/NULLIF(Precio_Promedio,0),0))-1)*-100,0) utilidad,cost_prom,, ROUND(stk_disponible_valor/NULLIF( tot_vtas/" + Math.round(valor_dedia) + ",0))  Dias_de_inventario_pesos,   ROUND(stk_disponible/NULLIF( cantidad/" + Math.round(valor_dedia) + ",0))  Dias_de_inventario_piezas  from( SELECT  t3.codigo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+
    " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,  "+
    "  ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible, "+
    "  ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,  COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio, "+
  "  COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom , "+
  " COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) / NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia," +
  
  
    "  FROM( "+
    "           SELECT Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene, "+
    "           SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta, "+
    "            item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion "+
    "             ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')  AND  "+
    "               SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND  "+
    "             ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in("+location+") ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1  "+
    "         FULL OUTER JOIN( "+
    "           SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id  "+
    "             THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,  "+
    "              item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) "+
    "               INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND  "+
    "               ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) "+
    "                  AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in("+location+") ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id) "+
    "         t2 ON t2.articulo=t1.articulo  "+
    "         FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo   "+
    "           from (SELECT articulo.displayname as codigo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal, "+
    "             (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo JOIN inventoryitemlocations AS ubicacion_inventario "+
    "              ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location WHERE ubicacion_inventario.location in("+location+")  )  "+
    "           group by sucursalid,articulo,sucursal,codigo)t3 ON t3.articulo=t1.articulo  "+
    "         WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR  "+
    "           (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR  "+
    "           (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)  "+
    "         GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo order by tot_vtas desc )"
  }
  else{
  
  
   
  var sqlPrincipal=" select codigo, articulo, sum(tot_vtas) tot_vtas, sum(cantidad) cantidad, sum(stk_disponible) stk_disponible, sum(stk_disponible_valor) stk_disponible_valor, sum(precio_promedio) precio_promedio, ROUND(((COALESCE(NULLIF(sum(cost_prom),0)/NULLIF(sum(precio_promedio),0),0))-1)*-100,0) utilidad,sum(cost_prom) cost_prom, ROUND(sum(stk_disponible_valor)/NULLIF( sum(tot_vtas)/" + Math.round(valor_dedia) + ",0))  Dias_de_inventario_pesos, ROUND(sum(stk_disponible)/NULLIF( sum(cantidad)/" + Math.round(valor_dedia) + ",0))  Dias_de_inventario_piezas from (select *  from( SELECT  t3.codigo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+
    " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,  "+
    "  ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible, "+
    "  ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,  COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio, "+
  "  COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom , "+
  " COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) / NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia," +
  
  
    "  FROM( "+
    "           SELECT Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene, "+
    "           SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta, "+
    "            item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion "+
    "             ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')  AND  "+
    "               SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND  "+
    "             ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(2) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1  "+
    "         FULL OUTER JOIN( "+
    "           SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id  "+
    "             THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,  "+
    "              item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) "+
    "               INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND  "+
    "               ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) "+
    "                  AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(2) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id) "+
    "         t2 ON t2.articulo=t1.articulo  "+
    "         FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo   "+
    "           from (SELECT articulo.displayname as codigo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal, "+
    "             (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo JOIN inventoryitemlocations AS ubicacion_inventario "+
    "              ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location WHERE ubicacion_inventario.location in(2)  )  "+
    "           group by sucursalid,articulo,sucursal,codigo)t3 ON t3.articulo=t1.articulo  "+
    "         WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR  "+
    "           (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR  "+
    "           (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)  "+
    "         GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo order by tot_vtas desc ) union all " +
  
  
    "select* from( SELECT  t3.codigo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+
    " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,  "+
    "  ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible, "+
    "  ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,  COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio, "+
  "  COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom , "+
  " COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) / NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia," +
  
  
    "  FROM( "+
    "           SELECT Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene, "+
    "           SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta, "+
    "            item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion "+
    "             ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')  AND  "+
    "               SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND  "+
    "             ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(4) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1  "+
    "         FULL OUTER JOIN( "+
    "           SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id  "+
    "             THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,  "+
    "              item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) "+
    "               INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND  "+
    "               ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) "+
    "                  AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(4) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id) "+
    "         t2 ON t2.articulo=t1.articulo  "+
    "         FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo   "+
    "           from (SELECT articulo.displayname as codigo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal, "+
    "             (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo JOIN inventoryitemlocations AS ubicacion_inventario "+
    "              ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location WHERE ubicacion_inventario.location in(4)  )  "+
    "           group by sucursalid,articulo,sucursal,codigo)t3 ON t3.articulo=t1.articulo  "+
    "         WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR  "+
    "           (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR  "+
    "           (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)  "+
    "         GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo order by tot_vtas desc )  union all " +
  
  
  
  
  
  
    "select* from( SELECT  t3.codigo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+
    " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,  "+
    "  ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible, "+
    "  ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,  COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio, "+
  "  COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom , "+
  " COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) / NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia," +
  
  
    "  FROM( "+
    "           SELECT Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene, "+
    "           SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta, "+
    "            item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion "+
    "             ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')  AND  "+
    "               SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND  "+
    "             ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(5) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1  "+
    "         FULL OUTER JOIN( "+
    "           SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id  "+
    "             THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,  "+
    "              item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) "+
    "               INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND  "+
    "               ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) "+
    "                  AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(5) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id) "+
    "         t2 ON t2.articulo=t1.articulo  "+
    "         FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo   "+
    "           from (SELECT articulo.displayname as codigo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal, "+
    "             (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo JOIN inventoryitemlocations AS ubicacion_inventario "+
    "              ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location WHERE ubicacion_inventario.location in(5)  )  "+
    "           group by sucursalid,articulo,sucursal,codigo)t3 ON t3.articulo=t1.articulo  "+
    "         WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR  "+
    "           (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR  "+
    "           (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)  "+
    "         GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo order by tot_vtas desc )  union all " +
  
  
  
  
  
    "select* from( SELECT  t3.codigo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+
    " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,  "+
    "  ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible, "+
    "  ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,  COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio, "+
  "  COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom , "+
  " COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) / NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia," +
  
  
    "  FROM( "+
    "           SELECT Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene, "+
    "           SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta, "+
    "            item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion "+
    "             ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')  AND  "+
    "               SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND  "+
    "             ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(6) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1  "+
    "         FULL OUTER JOIN( "+
    "           SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id  "+
    "             THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,  "+
    "              item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) "+
    "               INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND  "+
    "               ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) "+
    "                  AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(6) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id) "+
    "         t2 ON t2.articulo=t1.articulo  "+
    "         FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo   "+
    "           from (SELECT articulo.displayname as codigo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal, "+
    "             (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo JOIN inventoryitemlocations AS ubicacion_inventario "+
    "              ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location WHERE ubicacion_inventario.location in(6)  )  "+
    "           group by sucursalid,articulo,sucursal,codigo)t3 ON t3.articulo=t1.articulo  "+
    "         WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR  "+
    "           (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR  "+
    "           (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)  "+
    "         GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo order by tot_vtas desc )  union all " +
  
  
  
  
    "select* from( SELECT  t3.codigo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+
    " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,  "+
    "  ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible, "+
    "  ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,  COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio, "+
  "  COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom , "+
  " COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) / NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia," +
  
  
    "  FROM( "+
    "           SELECT Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene, "+
    "           SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta, "+
    "            item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion "+
    "             ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')  AND  "+
    "               SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND  "+
    "             ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(1) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1  "+
    "         FULL OUTER JOIN( "+
    "           SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id  "+
    "             THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,  "+
    "              item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) "+
    "               INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND  "+
    "               ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) "+
    "                  AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(1) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id) "+
    "         t2 ON t2.articulo=t1.articulo  "+
    "         FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo   "+
    "           from (SELECT articulo.displayname as codigo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal, "+
    "             (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo JOIN inventoryitemlocations AS ubicacion_inventario "+
    "              ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location WHERE ubicacion_inventario.location in(1)  )  "+
    "           group by sucursalid,articulo,sucursal,codigo)t3 ON t3.articulo=t1.articulo  "+
    "         WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR  "+
    "           (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR  "+
    "           (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)  "+
    "         GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo order by tot_vtas desc )  union all " +
  
  
  
    "select* from( SELECT  t3.codigo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+
    " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,  "+
    "  ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible, "+
    "  ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,  COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio, "+
  "  COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom , "+
  " COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) / NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia," +
  
  
    "  FROM( "+
    "           SELECT Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene, "+
    "           SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta, "+
    "            item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion "+
    "             ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')  AND  "+
    "               SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND  "+
    "             ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(3) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1  "+
    "         FULL OUTER JOIN( "+
    "           SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id  "+
    "             THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,  "+
    "              item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) "+
    "               INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND  "+
    "               ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) "+
    "                  AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(3) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id) "+
    "         t2 ON t2.articulo=t1.articulo  "+
    "         FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo   "+
    "           from (SELECT articulo.displayname as codigo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal, "+
    "             (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo JOIN inventoryitemlocations AS ubicacion_inventario "+
    "              ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location WHERE ubicacion_inventario.location in(3)  )  "+
    "           group by sucursalid,articulo,sucursal,codigo)t3 ON t3.articulo=t1.articulo  "+
    "         WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR  "+
    "           (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR  "+
    "           (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)  "+
    "         GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo order by tot_vtas desc )  union all " +
  
  
  
  
  
    "select* from( SELECT  t3.codigo,(CASE WHEN t3.articulo IS NULL THEN '' ELSE t3.articulo END) as articulo,  "+
    " ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) as tot_vtas ,  SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) as cantidad,  "+
    "  ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ),2) as stk_disponible, "+
    "  ROUND((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END),2) as stk_disponible_valor,  COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END),0),2), 0)  Precio_Promedio, "+
  "  COALESCE((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)  / NULLIF(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ), 0) , 0) cost_prom , "+
  " COALESCE(ROUND(SUM(CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END ) /  NULLIF(COALESCE( SUM(NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END) / NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0), 0),0)  dias_de_existencia," +
  
  
    "  FROM( "+
    "           SELECT Ubicacion.id as sucursalid,Ubicacion.fullname,SUM(  SOLine.quantity )*-1 AS Ene, "+
    "           SUM( CASE WHEN SalesOrder.terms=20 AND SOLine.item=item.id THEN SOLine.netamount WHEN SalesOrder.terms=4 AND  SOLine.item=item.id THEN SOLine.netamount ELSE SOLine.netamount *0.95  END)*-1 AS eneVentaNeta, "+
    "            item.fullName as articulo, FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion "+
    "             ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item )  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')  AND  "+
    "               SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND  "+
    "             ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND (  Ubicacion.id in(23) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id)t1  "+
    "         FULL OUTER JOIN( "+
    "           SELECT Ubicacion.id as sucursalid,Ubicacion.fullname as fullnames,SUM( SOLine.quantity )*-1 AS Ene,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1  AND SOLine.item=item.id  "+
    "             THEN (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM( CASE WHEN SalesOrder.custbody_bex_tiponc=3  AND SOLine.item=item.id AND Item.id!=19012 THEN (SOLine.netamount * -1) ELSE 0 END) AS eneventanetas,  "+
    "              item.fullName as articulo,FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) "+
    "               INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN CUSTOMLIST224 as clasificacion ON item.custitem4 = clasificacion.id left JOIN CUSTOMRECORD681 ON item.custitem15 = CUSTOMRECORD681.id WHERE ( SalesOrder.Type ='CustCred') AND  "+
    "               ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) "+
    "                  AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND ( Ubicacion.id in(23) ) GROUP BY Ubicacion.fullname,item.fullName, Ubicacion.id) "+
    "         t2 ON t2.articulo=t1.articulo  "+
    "         FULL OUTER JOIN (select  sucursal,articulo,sucursalid,sum(Stock_disponible) as Stock_disponible,SUM(Stock_disponible*valor_de_stock) as valor_de_stock,codigo   "+
    "           from (SELECT articulo.displayname as codigo, articulo.itemid as articulo,(ubicacion_inventario.location) AS sucursalid,ubicacion.fullname as sucursal, "+
    "             (ubicacion_inventario.quantityOnHand) AS Stock_disponible, ubicacion_inventario.averagecostmli as valor_de_stock, FROM item AS articulo JOIN inventoryitemlocations AS ubicacion_inventario "+
    "              ON articulo.id =ubicacion_inventario.item JOIN location as ubicacion ON ubicacion.id=ubicacion_inventario.location WHERE ubicacion_inventario.location in(23)  )  "+
    "           group by sucursalid,articulo,sucursal,codigo)t3 ON t3.articulo=t1.articulo  "+
    "         WHERE ((CASE WHEN t3.valor_de_stock IS NULL THEN 0 ELSE t3.valor_de_stock END)!=0 OR  "+
    "           (NVL(t1.ene,0)+CASE t2.articulo WHEN  'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN 0 ELSE NVL(t2.ene,0) END)!=0 OR  "+
    "           (CASE WHEN t3.stock_disponible IS NULL THEN 0 ELSE t3.stock_disponible END )!=0 OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)  "+
    "         GROUP BY t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo order by tot_vtas desc )  )  group by codigo,articulo" 
  
  
  }
  
  
  
  ////////////////////prueba total
    var sqlPrincipal1= " select consultainventario.displayname codigo,articulo, COALESCE(tot_vtas,0) tot_vtas,COALESCE(cant,0) cant,COALESCE(stk_disponible,0) stk_disponible,COALESCE(stk_disponible_valor,0) stk_disponible_valor,COALESCE(bkr,0) bkr,COALESCE(bkr_valor,0) bkr_valor from (select displayname,  "+ 
     " ROUND(sum(ssdasad2)) bkr,   ROUND(sum(ssdasad)) stk_disponible,ROUND(sum(vvllod ))stk_disponible_valor,ROUND(sum(vvllod2 ))bkr_valor from (select  displayname,inventoryitemlocations.quantityavailable ssdasad,inventoryitemlocations.quantityonorder ssdasad2,  "+ 
       "  (inventoryitemlocations  .quantityavailable*averagecost ) vvllod ,(inventoryitemlocations  .quantityonorder*averagecost ) vvllod2  from inventoryitemlocations  join item on inventoryitemlocations  .item =item .id  where  quantityavailable> =1     "+ 
       "   and inventoryitemlocations.location in("+location+")) group by displayname) consultainventario    join " +
  
    "(select  item.displayname codigo,item.description articulo,  vtn_tot.Venta_neta tot_vtas,cantidad.cantidad cant " +
   // " COALESCE(vtn_tot.Venta_neta / NULLIF( cantidad.cantidad,0), 0)  Precio_Promedio ,ROUND(stk_disponible / COALESCE(cantidad.cantidad / NULLIF(" + Math.round(valor_dedia) + ", 0), 0), 0)  dias_de_existencia" +
   "          from(select  total_Ingresos.desc articulo, "+
  "(COALESCE(total_ingresos,0)-(COALESCE(valor_1_para__el_5,0)+COALESCE(valor_2_para__el_5,0)))-(COALESCE(DEVOLUCIONES,0) ) Venta_neta  "+
  "from (SELECT      "+
  "  sum(netamount)*-1 total_Ingresos ,  ROUND(sum(quantity),2)*-1 cantidad, transactionline.item itm,item.id desc "+
  "  FROM      "+
  "    transaction join transactionline on transactionline.transaction=transaction.id    "+
  "join item on  transactionline.item=item .id    "+
  " "+
  "      where   transactionline.itemtype='InvtPart'      "+
  "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')      "+
  "    and transactionline.location in ("+location+") and transaction .type='SalesOrd' group by    transactionline.item,item.id) as  total_Ingresos left join  "+
  "  (select      "+
  "   sum(netamount)*-1 valor_1_para__el_5  ,   transactionline.item itm,item.id desc "+
  "  FROM      "+
  "   transaction join transactionline on transactionline.transaction=transaction.id   "+
  "join item on  transactionline.item=item .id   "+
  "     where   transactionline.itemtype='InvtPart'       "+
  "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')    and transactionline.location in ("+location+")      "+
  "    and transaction .type='SalesOrd'  and terms not  in(4,20 ) group by   transactionline.item,item.id)as  valor_1_para__el_5 on total_Ingresos.itm=valor_1_para__el_5.itm left join  "+
  " "+
  "    (select      "+
  "   sum(netamount)*.95 valor_2_para__el_5,   transactionline.item itm,item.id  desc "+
  "  FROM      "+
  "   transaction join transactionline on transactionline.transaction=transaction.id   "+
  "join item on  transactionline.item=item .id    "+
  " "+
  "     where   transactionline.itemtype='InvtPart'       "+
  "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')    and transactionline.location in ("+location+")      "+
  "    and transaction .type='SalesOrd'  and terms not  in(4,20 ) group by   transactionline.item,item.id)as  valor_2_para__el_5 on total_Ingresos.itm=valor_2_para__el_5.itm left join  "+
  "  (SELECT       "+
  "  sum(netamount)  DEVOLUCIONES,   transactionline.item itm ,item.id  desc "+
  "  FROM     "+
  "   transaction join transactionline on transactionline.transaction=transaction.id   "+
  "join item on  transactionline.item=item .id    "+
  "    where   transactionline.itemtype='InvtPart'        "+
  "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      AND      "+
  "  transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') and transactionline.location in ("+location+") and transaction .type in ('CustCred')  "+
  "  group by  transactionline.item,item.id)  as  DEVOLUCIONES on total_Ingresos.itm=DEVOLUCIONES.itm  left join "+
  
  
  
  "(SELECT      "+
  "  sum(quantity)*-1 cantidad , transactionline.item itm,item.id desc "+
  "  FROM      "+
  "    transaction join transactionline on transactionline.transaction=transaction.id    "+
  "join item on  transactionline.item=item .id    "+
  " "+
  "      where   transactionline.itemtype='InvtPart'      "+
  "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')      "+
  "    and transactionline.location in ("+location+") and transaction .type='SalesOrd' group by    transactionline.item,item.id) as  cantidad on  total_Ingresos.itm=cantidad.itm  union all  "+
  
  
  "  SELECT       "+
  "  item.id articulo,sum(netamount)*-1 Venta_neta "+
  "  FROM     "+
  "   transaction join transactionline on transactionline.transaction=transaction.id  "+
  "join item on  transactionline.item=item .id    "+
  "      where   transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      AND      "+
  "  transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') and transactionline.location in ("+location+") and transaction .type in ('CustCred')  and  custbody_bex_tiponc  in (1)       "+ 
  "  and transactionline.item = 19012     "+
  "  group by   transactionline.item,item.id) vtn_tot     join item on  vtn_tot.articulo= item.id   left join "+
  
  
  /////////////77777777777777777
  
  
  
  ///////////prueba total
  
  
  
  
         " (SELECT       "+
    "  ROUND(sum(quantity),2)*-1  cantidad, transactionline.item itm "+
   "  FROM       "+
    "   transaction join transactionline on transactionline.transaction=transaction.id     "+
  " join item on  transactionline.item=item .id     "+
   
      "   where   transactionline.itemtype='InvtPart'       "+
     "  AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      AND transaction .tranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')       "+
     "  and transactionline.location in ("+location+") and transaction .type='SalesOrd' group by    transactionline.item,item.id order by  item.id ) cantidad on  cantidad .itm=vtn_tot.articulo ) consulta_totales on consultainventario.displayname =consulta_totales.codigo"
  
  
  
  
  
  
   "(SELECT  id,displayname codigo,N2.*,averagecost cost FROM ( "+
                " SELECT  "+
      
                " N1.description AS Nombre,      "+
       
    
                    " "+ columnasXMeses(anio,mes,dia,mes_ini,dia_ini,anio,anio_ini,log) +
                   
  
              ""+ventadias+""+
  
              ""+ventadias1+""+
      "     ROUND (N1.stockDisponible)        AS stock, "+
       "     ROUND (N1.stockUbicacionPPedido)        AS stock_disponible , "+
  
  
               "   SUM( "+
              "     CASE WHEN "+
              "       1 = 1 "+
              "       AND N1.type IN('PurchOrd') "+
              "       AND N1.status IN('D', 'A', 'B', 'E', 'F') "+
              "     THEN N1.stock - N1.cantidadRecibida "+
              "     ELSE 0 "+
              "     END)                AS pendiente_recibir , "+
  
  
  
      " "+ columnasXMeses1(anio,mes,dia,mes_ini,dia_ini,anio,anio_ini,log) +
  
    
              
                " FROM ( "+
                "   SELECT "+
                "     itm.id            AS id, "+
            
                
  
                "     itm.description       AS description, "+
                    "       inl.invtclassification as custitem4 ,"+ 
                          "       cli5.name as custitem5 ,"+ 
                "     loc.name          AS location, "+
                "     loc.id            AS idLocation, "+
                "     trl.quantity       AS stock, "+
                "     itm.displayname       AS displayname, "+
                "     sbl.name          AS sublinea, "+
                "     lin.name          AS linea, "+
                "     sgm.name          AS comprador, "+
                "     clu.name          AS clasificador, "+
                "     ven.companyname       AS proveedor, "+
                "     trl.IsInventoryAffecting, "+
                "     tra.Voided, "+
                "     tra.type          AS type, "+
                "     tra.status          AS status, "+
                "     tra.tranid          AS tranid, "+
                "     trl.netamount       AS netamount, "+
                "     trl.quantityshiprecv    AS cantidadRecibida, "+
                "     trl.transactionlinetype, "+
                "     itm.itemtype        AS itemtype, "+
                "     itm.isinactive        AS isinactive, "+
                "     inl.preferredstocklevel   AS stockUbicacionOptimo, "+
                "     inl.quantityavailable      AS stockUbicacionPPedido, "+
                "     inl.onhandvaluemli   AS stockDisponible, "+
      
                "     tra.trandate        AS trandate, "+
                "     tra.approvalstatus      AS approvalstatus ,"+ 
                       "   inl.quantityonorder AS quantityonorder,"+
          "   itm.custitem15 AS custitem15,"+
  
                "  SubF.name As am_99 ,Departamento.name As am_11,Familia.name am_10,NCP.name am_12 "+
                "   FROM Item AS itm "+
                "      JOIN TransactionLine AS trl ON trl.Item = itm.ID "+
                "     LEFT JOIN Transaction AS tra ON tra.id = trl.Transaction "+
                "      LEFT JOIN location AS loc ON loc.id = trl.location "+
                "      LEFT JOIN inventoryitemlocations AS inl ON inl.Item = itm.ID AND inl.location = loc.id "+      // stock por ubicaciones
                "      LEFT JOIN CUSTOMRECORD_BEX_LINEAS_ARTICULOS AS lin ON lin.id = itm.custitem_bex_tipo_articulo "+ // Líneas
                "     LEFT JOIN customlist_clasificacion_art_ubicacion AS clu ON clu.id = inl.invtclassification "+   // Clasificación del inventario
                "     LEFT JOIN itemvendor AS itv ON itv.item = itm.id and  itv.preferredvendor = 'T'  "+   //  
                "     LEFT JOIN vendor AS ven ON ven.id = itv.vendor "+                         // Proveedores
                "     LEFT JOIN CUSTOMRECORD_BEX_SUBLINEA AS sbl ON sbl.id = itm.custitem_bex_sublinea "+         // Sublíneas
                "   LEFT JOIN CUSTOMLIST225  AS cli5 ON cli5.id = itm.custitem5  LEFT JOIN CUSTOMLIST224 AS cli4 ON cli4.id = itm.custitem4   LEFT JOIN CUSTOMLIST620 AS sgm ON sgm.id = itm.custitem8 LEFT JOIN CUSTOMRECORD673 SubF on  itm.custitem12=SubF.id LEFT JOIN CUSTOMRECORD670 Departamento on  itm.custitem9=Departamento.id LEFT JOIN CUSTOMRECORD672 Familia on  itm.custitem11=Familia.id LEFT JOIN CUSTOMRECORD671 NCP on  itm.custitem10=NCP.id"+ /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 05/07/2023-----------------------*/
                                // Comprador (Segmento)
                "   WHERE 1 = 1 "+
                "   AND itm.itemtype = 'InvtPart' "+
                "   AND itm.isinactive = 'F' "+
                "   AND loc.id IN("+location+")  "+
              
                " AND tra.trandate >= TO_DATE('"+ f_Inicio +"', '/DD/MM/YYYY') "+
                "   AND tra.trandate <= TO_DATE('"+ f_Final +"', '/DD/MM/YYYY') "+
                     
  
            
         
              
                " ) AS N1 "+
                " GROUP BY  "+
                "   N1.id, "+
            
                "   N1.description, "+
                "   N1.displayname "+
          
             
                  
                "  ) AS N2    LEFT JOIN item on  N2.Nombre= item.description  ) consulta2 on  consulta1.displayname= consulta2.codigo  )dto_to on vtn_tot.articulo =dto_to.id_ll order by item.description "
  
  
  
  
  }
  ///////////////filtro 13
  if(customrecord688==13){
  
 
     var dias1432 =Dias_diferencia(f_Inicio, f_Final);
              var dias143222 =contarDomingos(f_Inicio, f_Final);
        var ff111=Dias_diferencia(f_Inicio, f_Final);
            var valor_dedia=0
      if(dias1432==0){
        valor_dedia=1
      }else(
  valor_dedia=((dias1432*2)-dias143222)+2
        )
  
  
        
  if(location !="2,4,5,6,1,3,23"){
    if(Clasificacion2==''){
  
    var sqlPrincipal= " select  articulo,        "+
    "         ROUND(sum(tot_vtas)) tot_vtas ,  "+
    "         ROUND(sum(cantidad)) cantidad,  "+
    "         ROUND(sum(stk_disponible)) stk_disponible,  "+
    "         ROUND(sum(stk_disponible_valor)) stk_disponible_valor,  "+
    "        ROUND(  COALESCE(sum(stk_disponible_valor)/NULLIF(sum(tot_vtas)/"+valor_dedia+",0),0),0)   Dias_de_inventario__pesos, "+ 
    "        ROUND(COALESCE(sum(stk_disponible)/NULLIF(sum(cantidad)/"+valor_dedia+",0),0),0)  Dias_de_inventario_piezas "+ 
    "         from( SELECT codigo,  articulo,      "+
    "         tot_vtas,  "+
    "         cantidad,  "+
    "         stk_disponible,  "+
    "         stk_disponible_valor,   "+
    "         dias_de_existencia from(SELECT t3.codigo,    "+
    "               (  "+
    "     CASE  "+
    "     WHEN t3.articulo IS NULL THEN    ''  "+
    "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+  "+
    "     CASE t2.articulo  "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN    0  "+
    "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM(  "+
    "     CASE  "+
    "     WHEN t3.stock_disponible IS NULL THEN    0  "+
    "     ELSE t3.stock_disponible  "+
    "     END ),2) AS stk_disponible, ROUND((  "+
    "     CASE  "+
    "     WHEN t3.valor_de_stock IS NULL THEN    0  "+
    "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+  "+
    "     CASE t2.articulo  "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN    0  "+
    "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE((  "+
    "     CASE  "+
    "     WHEN t3.valor_de_stock IS NULL THEN    0  "+
    "     ELSE t3.valor_de_stock END) / NULLIF(SUM(  "+
    "     CASE  "+
    "     WHEN t3.stock_disponible IS NULL THEN    0  "+
    "     ELSE t3.stock_disponible  "+
    "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM(  "+
    "     CASE  "+
    "     WHEN t3.stock_disponible IS NULL THEN    0  "+
    "     ELSE t3.stock_disponible  "+
    "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+  "+
    "     CASE t2.articulo  "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN    0  "+
    "     ELSE NVL(t2.ene, 0) END) / NULLIF(4, 0), 0), 0), 0),  "+
    "         0) dias_de_existencia,  "+
    "         FROM(SELECT Ubicacion.id AS sucursalid,  "+
    "         Ubicacion.fullname,  "+
    "         SUM( SOLine.quantity )*-1 AS Ene,  "+
    "         SUM(   "+
    "     CASE  "+
    "     WHEN SalesOrder.terms=20  "+
    "         AND SOLine.item=item.id THEN  "+
    "     SOLine.netamount  "+
    "     WHEN SalesOrder.terms=4  "+
    "         AND SOLine.item=item.id THEN  "+
    "     SOLine.netamount  "+
    "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo,  "+
    "     FROM TransactiON AS SalesOrder  "+
    " INNER JOIN TransactionLine AS SOLine  "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID )  "+
    "         AND ( SOLine.MainLine = 'F' )  "+
    " INNER JOIN locatiON AS Ubicacion  "+
    "     ON ( SOLine.location= Ubicacion.id )  "+
    " INNER JOIN Item  "+
    "     ON ( Item.ID = SOLine.Item )  "+
    "     WHERE ( SalesOrder.Type = 'CustInvc' )  "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')  "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY'))  "+
    "         AND ( SalesOrder.Void = 'F' )  "+
    "         AND ( SalesOrder.Voided = 'F' )  "+
    "         AND ( Item.ItemType <> 'Discount' )  "+
    "         AND ( Item.ItemType != 'Service' )  "+
    "         AND ( Item.ItemType != 'Assembly' )  "+
    "         AND ( Item.id!=25311 )  "+
    "         AND ( Ubicacion.id in("+location+") )  "+
    "     GROUP BY  Ubicacion.fullname,  "+
    "         item.fullName,  "+
    "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid,  "+
    "         Ubicacion.fullname AS fullnames,  "+
    "         SUM( SOLine.quantity )*-1 AS Ene,  "+
    "         SUM(  "+
    "     CASE  "+
    "     WHEN SalesOrder.custbody_bex_tiponc=1  "+
    "         AND SOLine.item=item.id THEN  "+
    "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(   "+
    "     CASE  "+
    "     WHEN SalesOrder.custbody_bex_tiponc=3  "+
    "         AND SOLine.item=item.id  "+
    "         AND Item.id!=19012 THEN  "+
    "     (SOLine.netamount * -1)  "+
    "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder  "+
    " INNER JOIN TransactionLine AS SOLine  "+
    "     ON ( SOLine.TransactiON = SalesOrder.ID )  "+
    "         AND ( SOLine.MainLine = 'F' )  "+
    " INNER JOIN locatiON AS Ubicacion  "+
    "     ON ( SOLine.location= Ubicacion.id )  "+
    " INNER JOIN Item  "+
    "     ON ( Item.ID = SOLine.Item )  "+
    " LEFT JOIN CUSTOMLIST224 AS clasificacion  "+
    "     ON item.custitem4 = clasificacion.id  "+
    " LEFT JOIN CUSTOMRECORD681  "+
    "     ON item.custitem15 = CUSTOMRECORD681.id  "+
    "     WHERE ( SalesOrder.Type ='CustCred')  "+
    "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')  "+
    "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY'))  "+
    "         AND ( SalesOrder.Void = 'F' )  "+
    "         AND ( SalesOrder.Voided = 'F' )  "+
    "         AND ( Item.ItemType <> 'Discount' )  "+
    "         AND ( Item.ItemType != 'Assembly' )  "+
    "         AND ( Item.id!=25311 )  "+
    "         AND ( SalesOrder.custbody_bex_tiponc=1  "+
    "         OR SalesOrder.custbody_bex_tiponc=3)  "+
    "         AND ( Ubicacion.id in("+location+") )  "+
    "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2  "+
    "     ON t2.articulo=t1.articulo FULL OUTER  "+
    " JOIN (SELECT sucursal,  "+
    "         articulo,  "+
    "         sucursalid,  "+
    "         sum(Stock_disponible) AS Stock_disponible,  "+
    "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock,  "+
    "         codigo  "+
    "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo,  "+
    "         articulo.itemid AS articulo,  "+
    "         (ubicacion_inventario.location) AS sucursalid,  "+
    "         ubicacion.fullname AS sucursal,  "+
    "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible,  "+
    "         ubicacion_inventario.averagecostmli AS valor_de_stock,          "+
    "     FROM item AS articulo  "+
    " JOIN inventoryitemlocations AS ubicacion_inventario  "+
    "     ON articulo.id =ubicacion_inventario.item  "+
    " JOIN locatiON AS ubicacion  "+
    "     ON ubicacion.id=ubicacion_inventario.location  "+
    "     WHERE ubicacion_inventario.locatiON in("+location+") )  "+
    "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3  "+
    "     ON t3.articulo=t1.articulo  "+
    "     WHERE ((  "+
    "     CASE  "+
    "     WHEN t3.valor_de_stock IS NULL THEN    0  "+
    "     ELSE t3.valor_de_stock END)!=0  "+
    "         OR (NVL(t1.ene,0)+  "+
    "     CASE t2.articulo  "+
    "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN    0  "+
    "     ELSE NVL(t2.ene,0) END)!=0  "+
    "         OR (  "+
    "     CASE  "+
    "     WHEN t3.stock_disponible IS NULL THEN    0  "+
    "     ELSE t3.stock_disponible  "+
    "     END )!=0  "+
    "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)  "+
    "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo  "+
    " ORDER BY  tot_vtAS DESC ) )   group by articulo  " 
    }
    else{
      var sqlPrincipal= " select  articulo,        "+
      "         ROUND(sum(tot_vtas)) tot_vtas ,  "+
      "         ROUND(sum(cantidad)) cantidad,  "+
      "         ROUND(sum(stk_disponible)) stk_disponible,  "+
      "         ROUND(sum(stk_disponible_valor)) stk_disponible_valor,  "+
      "        ROUND(  COALESCE(sum(stk_disponible_valor)/NULLIF(sum(tot_vtas)/"+valor_dedia+",0),0),0)   Dias_de_inventario__pesos, "+ 
      "        ROUND(COALESCE(sum(stk_disponible)/NULLIF(sum(cantidad)/"+valor_dedia+",0),0),0)  Dias_de_inventario_piezas "+ 
      "         from( SELECT codigo,  articulo,      "+
      "         tot_vtas,  "+
      "         cantidad,  "+
      "         stk_disponible,  "+
      "         stk_disponible_valor,   "+
      "         dias_de_existencia from(SELECT t3.codigo,    "+
      "               (  "+
      "     CASE  "+
      "     WHEN t3.articulo IS NULL THEN    ''  "+
      "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+  "+
      "     CASE t2.articulo  "+
      "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN    0  "+
      "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM(  "+
      "     CASE  "+
      "     WHEN t3.stock_disponible IS NULL THEN    0  "+
      "     ELSE t3.stock_disponible  "+
      "     END ),2) AS stk_disponible, ROUND((  "+
      "     CASE  "+
      "     WHEN t3.valor_de_stock IS NULL THEN    0  "+
      "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+  "+
      "     CASE t2.articulo  "+
      "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN    0  "+
      "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE((  "+
      "     CASE  "+
      "     WHEN t3.valor_de_stock IS NULL THEN    0  "+
      "     ELSE t3.valor_de_stock END) / NULLIF(SUM(  "+
      "     CASE  "+
      "     WHEN t3.stock_disponible IS NULL THEN    0  "+
      "     ELSE t3.stock_disponible  "+
      "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM(  "+
      "     CASE  "+
      "     WHEN t3.stock_disponible IS NULL THEN    0  "+
      "     ELSE t3.stock_disponible  "+
      "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+  "+
      "     CASE t2.articulo  "+
      "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN    0  "+
      "     ELSE NVL(t2.ene, 0) END) / NULLIF(4, 0), 0), 0), 0),  "+
      "         0) dias_de_existencia,  "+
      "         FROM(SELECT Ubicacion.id AS sucursalid,  "+
      "         Ubicacion.fullname,  "+
      "         SUM( SOLine.quantity )*-1 AS Ene,  "+
      "         SUM(   "+
      "     CASE  "+
      "     WHEN SalesOrder.terms=20  "+
      "         AND SOLine.item=item.id THEN  "+
      "     SOLine.netamount  "+
      "     WHEN SalesOrder.terms=4  "+
      "         AND SOLine.item=item.id THEN  "+
      "     SOLine.netamount  "+
      "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo,  "+
      "     FROM TransactiON AS SalesOrder  "+
      " INNER JOIN TransactionLine AS SOLine  "+
      "     ON ( SOLine.TransactiON = SalesOrder.ID )  "+
      "         AND ( SOLine.MainLine = 'F' )  "+
      " INNER JOIN locatiON AS Ubicacion  "+
      "     ON ( SOLine.location= Ubicacion.id )  "+
      " INNER JOIN Item  "+
      "     ON ( Item.ID = SOLine.Item )  "+
      "     WHERE ( SalesOrder.Type = 'CustInvc' )  "+
      "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')  "+
      "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY'))  "+
      "         AND ( SalesOrder.Void = 'F' )  "+
      "         AND ( SalesOrder.Voided = 'F' )  "+
      "         AND ( Item.ItemType <> 'Discount' )  "+
      "         AND ( Item.ItemType != 'Service' )  "+
      "         AND ( Item.ItemType != 'Assembly' )  "+
      "         AND ( Item.id!=25311 )  "+
      "         AND ( Ubicacion.id in("+location+") )  "+
      "     GROUP BY  Ubicacion.fullname,  "+
      "         item.fullName,  "+
      "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid,  "+
      "         Ubicacion.fullname AS fullnames,  "+
      "         SUM( SOLine.quantity )*-1 AS Ene,  "+
      "         SUM(  "+
      "     CASE  "+
      "     WHEN SalesOrder.custbody_bex_tiponc=1  "+
      "         AND SOLine.item=item.id THEN  "+
      "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(   "+
      "     CASE  "+
      "     WHEN SalesOrder.custbody_bex_tiponc=3  "+
      "         AND SOLine.item=item.id  "+
      "         AND Item.id!=19012 THEN  "+
      "     (SOLine.netamount * -1)  "+
      "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder  "+
      " INNER JOIN TransactionLine AS SOLine  "+
      "     ON ( SOLine.TransactiON = SalesOrder.ID )  "+
      "         AND ( SOLine.MainLine = 'F' )  "+
      " INNER JOIN locatiON AS Ubicacion  "+
      "     ON ( SOLine.location= Ubicacion.id )  "+
      " INNER JOIN Item  "+
      "     ON ( Item.ID = SOLine.Item )  "+
      " LEFT JOIN CUSTOMLIST224 AS clasificacion  "+
      "     ON item.custitem4 = clasificacion.id  "+
      " LEFT JOIN CUSTOMRECORD681  "+
      "     ON item.custitem15 = CUSTOMRECORD681.id  "+
      "     WHERE ( SalesOrder.Type ='CustCred')  "+
      "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')  "+
      "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY'))  "+
      "         AND ( SalesOrder.Void = 'F' )  "+
      "         AND ( SalesOrder.Voided = 'F' )  "+
      "         AND ( Item.ItemType <> 'Discount' )  "+
      "         AND ( Item.ItemType != 'Assembly' )  "+
      "         AND ( Item.id!=25311 )  "+
      "         AND ( SalesOrder.custbody_bex_tiponc=1  "+
      "         OR SalesOrder.custbody_bex_tiponc=3)  "+
      "         AND ( Ubicacion.id in("+location+") )  "+
      "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2  "+
      "     ON t2.articulo=t1.articulo FULL OUTER  "+
      " JOIN (SELECT sucursal,  "+
      "         articulo,  "+
      "         sucursalid,  "+
      "         sum(Stock_disponible) AS Stock_disponible,  "+
      "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock,  "+
      "         codigo  "+
      "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo,  "+
      "         articulo.itemid AS articulo,  "+
      "         (ubicacion_inventario.location) AS sucursalid,  "+
      "         ubicacion.fullname AS sucursal,  "+
      "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible,  "+
      "         ubicacion_inventario.averagecostmli AS valor_de_stock,          "+
      "     FROM item AS articulo  "+
      " JOIN inventoryitemlocations AS ubicacion_inventario  "+
      "     ON articulo.id =ubicacion_inventario.item  "+
      " JOIN locatiON AS ubicacion  "+
      "     ON ubicacion.id=ubicacion_inventario.location  "+
      "     WHERE ubicacion_inventario.locatiON in("+location+") )  "+
      "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3  "+
      "     ON t3.articulo=t1.articulo  "+
      "     WHERE ((  "+
      "     CASE  "+
      "     WHEN t3.valor_de_stock IS NULL THEN    0  "+
      "     ELSE t3.valor_de_stock END)!=0  "+
      "         OR (NVL(t1.ene,0)+  "+
      "     CASE t2.articulo  "+
      "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN    0  "+
      "     ELSE NVL(t2.ene,0) END)!=0  "+
      "         OR (  "+
      "     CASE  "+
      "     WHEN t3.stock_disponible IS NULL THEN    0  "+
      "     ELSE t3.stock_disponible  "+
      "     END )!=0  "+
      "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0)  "+
      "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo  "+
      " ORDER BY  tot_vtAS DESC ) ) where codigo in ("+Clasificacion2+") group by articulo  " 
  }}
    else{
      if(Clasificacion2==''){
        var sqlPrincipal= " SELECT articulo, "+
        "         ROUND(sum(tot_vtas)) tot_vtas, "+
        "         ROUND(sum(cantidad)) cantidad, "+
        "         ROUND(sum(stk_disponible)) stk_disponible, "+
        "         ROUND(sum(stk_disponible_valor)-22.72) stk_disponible_valor, "+
        "        ROUND(  COALESCE(sum(stk_disponible_valor)/NULLIF(sum(tot_vtas)/"+valor_dedia+",0),0),0)   Dias_de_inventario__pesos, "+ 
        "   ROUND(COALESCE(sum(stk_disponible)/NULLIF(sum(cantidad)/"+valor_dedia+",0),0),0) Dias_de_inventario_piezas  "+
        "     FROM (SELECT * from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(2) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(2) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(2) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC ) "+
        " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(4) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(4) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(4) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC ) "+
        " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(5) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(5) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(5) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC ) "+
        " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(6) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(6) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(6) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC ) "+
        " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(1) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(1) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(1) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC ) "+
        " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(3) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(3) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(3) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC ) "+
        " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(23) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(23) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(23) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC )"+
        " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, 0 AS tot_vtAS , 0 as cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(26) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(26) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(26) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC )"+
          " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, 0 AS tot_vtAS , 0 as cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(12) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(12) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(12) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC )"+
          " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, 0 AS tot_vtAS , 0 as cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(32) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(32) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(32) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC )"+
          " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, 0 AS tot_vtAS , 0 as cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(21) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(21) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(21) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC )"+
          " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, 0 AS tot_vtAS , 0 as cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(32) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(32) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(32) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC )"+
          " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, 0 AS tot_vtAS , 0 as cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(21) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(21) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(21) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC )"+

        "  )  "+
        "     GROUP BY  articulo "
      } 
      else if (Clasificacion2==4){
      var sqlPrincipal= " SELECT articulo, "+
        "         ROUND(sum(tot_vtas)) tot_vtas, "+
        "         ROUND(sum(cantidad)) cantidad, "+
        "         ROUND(sum(stk_disponible)) stk_disponible, "+
        "         ROUND(sum(stk_disponible_valor)+33.37) stk_disponible_valor, "+
        "        ROUND(  COALESCE(sum(stk_disponible_valor)/NULLIF(sum(tot_vtas)/"+valor_dedia+",0),0),0)   Dias_de_inventario__pesos, "+ 
        "   ROUND(COALESCE(sum(stk_disponible)/NULLIF(sum(cantidad)/"+valor_dedia+",0),0),0) Dias_de_inventario_piezas  "+
        "     FROM (SELECT * from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(2) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(2) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(2) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC ) "+
        " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(4) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(4) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(4) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC ) "+
        " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(5) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(5) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(5) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC ) "+
        " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(6) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(6) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(6) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC ) "+
        " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(1) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(1) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(1) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC ) "+
        " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(3) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(3) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(3) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC ) "+
        " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(23) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(23) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(23) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC )  ) where codigo is null "+
        "     GROUP BY  articulo "
     }
      
      else {
        var sqlPrincipal= " SELECT articulo, "+
        "         ROUND(sum(tot_vtas)) tot_vtas, "+
        "         ROUND(sum(cantidad)) cantidad, "+
        "         ROUND(sum(stk_disponible)) stk_disponible, "+
        "         ROUND(sum(stk_disponible_valor)+33.37) stk_disponible_valor, "+
        "        ROUND(  COALESCE(sum(stk_disponible_valor)/NULLIF(sum(tot_vtas)/"+valor_dedia+",0),0),0)   Dias_de_inventario__pesos, "+ 
        "   ROUND(COALESCE(sum(stk_disponible)/NULLIF(sum(cantidad)/"+valor_dedia+",0),0),0) Dias_de_inventario_piezas  "+
        "     FROM (SELECT * from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(2) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(2) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(2) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC ) "+
        " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(4) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(4) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(4) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC ) "+
        " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(5) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(5) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(5) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC ) "+
        " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(6) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(6) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(6) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC ) "+
        " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(1) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(1) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(1) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC ) "+
        " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(3) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(3) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(3) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC ) "+
        " UNION ALL "+
        " select* from(SELECT t3.codigo, "+
        "         ( "+
        "     CASE "+
        "     WHEN t3.articulo IS NULL THEN "+
        "     '' "+
        "     ELSE t3.articulo END) AS articulo, ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)),2) AS tot_vtAS , SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END) AS cantidad, ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ),2) AS stk_disponible, ROUND(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END),2) AS stk_disponible_valor, COALESCE(ROUND(SUM(NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0)) / NULLIF( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END),0),2), 0) Precio_Promedio, COALESCE(( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END) / NULLIF(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ), 0) , 0) cost_prom , COALESCE(ROUND(SUM( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END ) / NULLIF(COALESCE( SUM(NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene, "+
        "         0) END) / NULLIF(1, "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0), "+
        "         0) dias_de_existencia, "+
        "         FROM(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.terms=20 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     WHEN SalesOrder.terms=4 "+
        "         AND SOLine.item=item.id THEN "+
        "     SOLine.netamount "+
        "     ELSE SOLine.netamount *0.95 END)*-1 AS eneVentaNeta, item.fullName AS articulo, "+
        "     FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        "     WHERE ( SalesOrder.Type = 'CustInvc' ) "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Service' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( Ubicacion.id in(23) ) "+
        "     GROUP BY  Ubicacion.fullname, "+
        "         item.fullName, "+
        "         Ubicacion.id)t1 FULL OUTER JOIN(SELECT Ubicacion.id AS sucursalid, "+
        "         Ubicacion.fullname AS fullnames, "+
        "         SUM( SOLine.quantity )*-1 AS Ene, "+
        "         SUM( "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=1 "+
        "         AND SOLine.item=item.id THEN "+
        "     (SOLine.netamount * -1)ELSE 0 END) AS eneventanet,SUM(  "+
        "     CASE "+
        "     WHEN SalesOrder.custbody_bex_tiponc=3 "+
        "         AND SOLine.item=item.id "+
        "         AND Item.id!=19012 THEN "+
        "     (SOLine.netamount * -1) "+
        "     ELSE 0 END) AS eneventanetas, item.fullName AS articulo,FROM TransactiON AS SalesOrder "+
        " INNER JOIN TransactionLine AS SOLine "+
        "     ON ( SOLine.TransactiON = SalesOrder.ID ) "+
        "         AND ( SOLine.MainLine = 'F' ) "+
        " INNER JOIN locatiON AS Ubicacion "+
        "     ON ( SOLine.location= Ubicacion.id ) "+
        " INNER JOIN Item "+
        "     ON ( Item.ID = SOLine.Item ) "+
        " LEFT JOIN CUSTOMLIST224 AS clasificacion "+
        "     ON item.custitem4 = clasificacion.id "+
        " LEFT JOIN CUSTOMRECORD681 "+
        "     ON item.custitem15 = CUSTOMRECORD681.id "+
        "     WHERE ( SalesOrder.Type ='CustCred') "+
        "         AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "         AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) "+
        "         AND ( SalesOrder.Void = 'F' ) "+
        "         AND ( SalesOrder.Voided = 'F' ) "+
        "         AND ( Item.ItemType <> 'Discount' ) "+
        "         AND ( Item.ItemType != 'Assembly' ) "+
        "         AND ( Item.id!=25311 ) "+
        "         AND ( SalesOrder.custbody_bex_tiponc=1 "+
        "         OR SalesOrder.custbody_bex_tiponc=3) "+
        "         AND ( Ubicacion.id in(23) ) "+
        "     GROUP BY  Ubicacion.fullname,item.fullName, Ubicacion.id) t2 "+
        "     ON t2.articulo=t1.articulo FULL OUTER "+
        " JOIN (SELECT sucursal, "+
        "         articulo, "+
        "         sucursalid, "+
        "         sum(Stock_disponible) AS Stock_disponible, "+
        "         SUM(Stock_disponible*valor_de_stock) AS valor_de_stock, "+
        "         codigo "+
        "     FROM (SELECT ubicacion_inventario .invtclassification AS codigo, "+
        "         articulo.itemid AS articulo, "+
        "         (ubicacion_inventario.location) AS sucursalid, "+
        "         ubicacion.fullname AS sucursal, "+
        "         (ubicacion_inventario.quantityOnHand) AS Stock_disponible, "+
        "         ubicacion_inventario.averagecostmli AS valor_de_stock, "+
        "          "+
        "     FROM item AS articulo "+
        " JOIN inventoryitemlocations AS ubicacion_inventario "+
        "     ON articulo.id =ubicacion_inventario.item "+
        " JOIN locatiON AS ubicacion "+
        "     ON ubicacion.id=ubicacion_inventario.location "+
        "     WHERE ubicacion_inventario.locatiON in(23) ) "+
        "     GROUP BY  sucursalid,articulo,sucursal,codigo)t3 "+
        "     ON t3.articulo=t1.articulo "+
        "     WHERE (( "+
        "     CASE "+
        "     WHEN t3.valor_de_stock IS NULL THEN "+
        "     0 "+
        "     ELSE t3.valor_de_stock END)!=0 "+
        "         OR (NVL(t1.ene,0)+ "+
        "     CASE t2.articulo "+
        "     WHEN 'DESCUENTO BONIFICACIÓN PRECIO PACTADO' THEN "+
        "     0 "+
        "     ELSE NVL(t2.ene,0) END)!=0 "+
        "         OR ( "+
        "     CASE "+
        "     WHEN t3.stock_disponible IS NULL THEN "+
        "     0 "+
        "     ELSE t3.stock_disponible "+
        "     END )!=0 "+
        "         OR (NVL( t1.eneVentaNeta,0)+NVL( t2.eneventanetas, 0 ) + NVL(t2.eneventanet,0))!=0) "+
        "     GROUP BY  t3.articulo ,t3.sucursal,t3.valor_de_stock,t3.codigo "+
        " ORDER BY  tot_vtAS DESC )  ) where codigo in ("+Clasificacion2+")  "+
        "     GROUP BY  articulo "
      }
    }
  
                
                //Clasificacion2+"  )order by  tot_vtas desc ";
  }

  if(customrecord688==14){
    var sqlPrincipal="select transaction.tranid Transaccion,Customer.companyname cliente, sum(netamount)*-1 total_Ingresos ,sum(quantity)*-1 cantidad,transaction.createddate fecha from transaction join transactionline on transactionline.transaction=transaction.id "+
    "  join Customer on  transaction .entity=Customer.id   "+
   // "  join (select transaction,ROUND(quantity*costestimaterate)trlcost   from  transactionline group by transaction) trlcost on trlcost.transaction=transaction.id   "+
    "      where      "+
    "    transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')  "+  
    "  AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')     "+
    "    and transactionline.location in ("+location+") and transaction .type='SalesOrd'    group by  transaction.tranid,Customer.companyname,transaction.createddate ";
  }
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
  var fecha_dia=dias_TranscurridosDelMes(mes,dia)
  var dias_habiles_Del_mes=dias_Habiles_del_mes(mes)


  var dias1432 =Dias_diferencia(f_Inicio, f_Final);
  var dias143222 =contarDomingos(f_Inicio, f_Final);
var ff111=Dias_diferencia(f_Inicio, f_Final);
var valor_dedia=0
if(dias1432==0){
valor_dedia=1
}else(
valor_dedia=((dias1432*2)-dias143222)+2
)

      innerHtml = "";
  
   
      innerHtml = "";
  
  
           
        
  
      innerHtml+= '<input type="text "  class="form-control" value="'+parseInt(valor_dedia)+' dias  " readonly><table style="table-layout: fixed; width: 300%; border-spacing: 6px;">';
      innerHtml+= '<tr>';
      innerHtml+= '<td>';
     
          innerHtml+= '  <br/><br/> <div class="row">';
      innerHtml+= ' <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 text-left">';
      innerHtml+= '   <table class="display nowrap table table-sm table-bordered table-hover table-responsive-sm" id="resultsTable"> ';
      if ( records.length > 0 ) {
  
        var columnNames = Object.keys( records[0] );
        innerHtml+= '     <thead class="thead-light">';
        innerHtml+= '       <tr>';
  
        if(customrecord688==10){
          
  
             
          innerHtml+= '     <th class="text-right">transaccion</th>';
  
          
  
      }
  
     
  
  
      
        for ( i = 1; i < columnNames.length; i++ ) {
      
  
  if (columnNames[i].indexOf("venta_objetivo")   !== -1) continue;
  if (columnNames[i].indexOf("utilidad_objetivo")   !== -1) continue;
  if (columnNames[i].indexOf("objetivo_margen")   !== -1) continue;
       if (columnNames[i].indexOf("mes")   !== -1) continue;
  
       if (columnNames[i].indexOf("stock")   !== -1) continue;
  if (columnNames[i].indexOf("pendiente_recibir")   !== -1) continue;
       
     if (columnNames[i].indexOf("stock_disponible")   !== -1) continue;     
    
  /*
     if (columnNames[i].indexOf("proveedor")   !== -1) continue;
     if (columnNames[i].indexOf("compra")   !== -1) continue;
     if (columnNames[i].indexOf("monto_recibido")   !== -1) continue;
     if (columnNames[i].indexOf("restante_de_compra")   !== -1) continue;
     if (columnNames[i].indexOf("comprador")   !== -1) continue;
     if (columnNames[i].indexOf("estatus")   !== -1) continue;
     if (columnNames[i].indexOf("pedido")   !== -1) continue;
     if (columnNames[i].indexOf("recibido")   !== -1) continue;
     if (columnNames[i].indexOf("restante")   !== -1) continue;
     if (columnNames[i].indexOf("fecha")   !== -1) continue;
     if (columnNames[i].indexOf("transaccion")   !== -1) continue;
     if (columnNames[i].indexOf("Porcentaje_de_surtido")   !== -1) continue;*/
     
  
  
  
     if (columnNames[i].indexOf("idtransaccion")   !== -1) continue;  
     if (columnNames[i].indexOf("trlcom")   !== -1) continue;  
          innerHtml+= '     <th class="text-right">'+columnNames[i]+'</th>';
  
          
   
        }
   
        if(customrecord688==7){

          innerHtml+= '     <th class="text-right">Utilidad</th>';
      
  
  
  
      }
      if(customrecord688==1){

        innerHtml+= '     <th class="text-right">margen</th>';
    



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
  
                          var   idtransaccion=0;
                          
                          var   trlcom=0;
  var pendiente_recibir = 0;
      var stock = 0;
             
                 var cant_vta_pz=0;
                 var vt2=0;
                 var cant_vta_pz=0;
                 var stk_disponible=0;
  
   var didididi =0;
  
  
                      var venta_net_client=0;
                 var  utilidad=0;
                 var fecha="";
    var stock_disponible=0;
  
    var venta_neta  =0;
    var utilidad =0;
  
          
    var cantidad  =0;
    var stk_disponible   =0;
    var tot_vtas =0;
    var stk_disponible_valor =0;
          innerHtml+= '     <tr>';
          var record = records[r];
          for ( c = 1; c < columnNames.length; c++ ) {
            var venta_neta1  =0;
            var utilidad1 =0;
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
            if (column.indexOf("venta_objetivo") !== -1)
              vo = parseFloat(value)
  
              if (column.indexOf("idtransaccion") !== -1)
              idtransaccion = parseInt(value)
              if (column.indexOf("trlcom") !== -1)
              trlcom = value.toString();
              
  
            if (column.indexOf("stock_disponible") !== -1)
              stock_disponible = parseFloat(value)
  
              if (column.indexOf("venta_neta") !== -1)
              venta_neta = parseFloat(value)
  
  
              if (column.indexOf("utilidad") !== -1)
              utilidad = parseFloat(value)
              if (column.indexOf("venta_neta") !== -1)
              venta_neta1 = parseFloat(value)
  
  
              if (column.indexOf("utilidad") !== -1)
              utilidad1 = parseFloat(value)
  
           
  
  
              if (column.indexOf("trlcom") !== -1)continue;
              if (column.indexOf("idtransaccion") !== -1)continue;
   if (column.indexOf("stock_disponible") !== -1)continue;
            if (column.indexOf("vr") !== -1)
              vr = parseFloat(value)
  
  
            if (column.indexOf("v2022") !== -1)
              v2022 = parseFloat(value)
  
  if (column.indexOf("fecha") !== -1)
          
    try{
            fecha = value.toString();
          }
          catch(ex){
             fecha = 0;
          }
  

            if (column.indexOf("cantidad") !== -1) 
            cantidad = parseFloat(value)
            if (column.indexOf("stk_disponible") !== -1)   
            stk_disponible = parseFloat(value)
            else if (column.indexOf("stk_disponible_valor") !== -1) 
            stk_disponible_valor = parseFloat(value)
            if (column.indexOf("tot_vtas") !== -1) 
            tot_vtas = parseFloat(value)
         


         



  
            if (column.indexOf("venta_2021") !== -1)
              venta_2021 = parseFloat(value)
  
             if (column.indexOf("utilidad_objetivo") !== -1)
              utilidad_objetivo = parseFloat(value)
        if (column.indexOf("compra") !== -1)
              compra = parseFloat(value)
            if (column.indexOf("objetivo_margen") !== -1)
              objetivo_margen = parseFloat(value)
      
  
     if (column.indexOf("venta_neta") !== -1)
              venta_net_client = parseFloat(value)
               if (column.indexOf("utilidad") !== -1)
              utilidad = parseFloat(value)
  
  
                if (column.indexOf("venta_objetivo") !== -1)continue;
                      if (column.indexOf("utilidad_objetivo") !== -1)continue;
                      if (column.indexOf("objetivo_margen") !== -1)continue;
  
  
   if (column.indexOf("cost") !== -1)
              cost = parseFloat(value)
  
  
         
  
      
  
                        if (column.indexOf("cant_vta_pz") !== -1)
  
              cant_vta_pz = parseFloat(value);
   if (column.indexOf("stock") !== -1)
              stock = parseFloat(value);
  
             if (column.indexOf("pendiente_recibir") !== -1)
              pendiente_recibir = parseFloat(value);
  
  
     if (column.indexOf("stock") !== -1)continue;
                      if (column.indexOf("pendiente_recibir") !== -1)continue;
  
   
             if (column.indexOf("didididi") !== -1)
              didididi = parseFloat(value);
      if (column.indexOf("vt2") !== -1)
              vt2 = parseFloat(value)
  
      if (column.indexOf("tot_vtas") !== -1)
              tot_vtas = parseFloat(value)
  
   if (column.indexOf("mes") !== -1)continue;
             
    
            
              es_numero = c >= 8 && !isNaN(value) ? true : false;
              innerHtml += '    <td class="text-right  ">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
            
              
        
          }
  vo_dia =(vo/Math.round(dias_habiles_Del_mes))*Math.round(fecha_dia)
  Porcent_venta=(vr.toFixed(2)/ vo_dia)*100  
  
   utilidad_objetivo_dia  =(utilidad_objetivo/Math.round(dias_habiles_Del_mes))*Math.round(fecha_dia)
  
          utilidad_real= vr - compra
          porcentaje_utilidad =(compra/ utilidad_objetivo_dia)*100
  
  margen_real=(compra/vr)*100
  
  
        if(cant_vta_pz==0){Prec_Promedio=0}else{Prec_Promedio=vt2/cant_vta_pz}       
  tot_vtas_op=cost*stock;
  
  
  tot_vtas_op22 =cost*stock_disponible;
   if (isNaN(tot_vtas_op22)){tot_vtas_op22=0}
   if (isNaN(tot_vtas_op)){tot_vtas_op=0}
  tot_vtas_op2=cost*pendiente_recibir;
   if (isNaN(tot_vtas_op2)){tot_vtas_op2=0}
  
  
  
   if (isNaN(cost)){cost=0}
          if(cant_vta_pz >0  )
            {vesteac=stock/didididi;}
            else{  vesteac=0}
  if (vesteac>150){vesteac=vesteac}else{vesteac=vesteac.toFixed(0)}
  

  
        if(customrecord688==1){
          margen=(utilidad/venta_neta)*100
    
          if (isNaN(margen)){margen=0}
          innerHtml+= '     <td class="text-right">'+parseInt(margen)+'% </td>';
      
  
  
  
      }
 
  
     
      if(customrecord688==10){
  
  
        
  
                innerHtml+= '     <td class="text-left"> <a href="https://5017898.app.netsuite.com/app/accounting/transactions/purchord.nl?id='+parseInt(idtransaccion)+'&whence="     target="_blank"         >'+trlcom.toString();+' </a></td>';
            
        
        
        
            }
  
            if(customrecord688==7){


              margen=(utilidad/venta_net_client)*100
               if (isNaN(margen)){margen=0}
                if(venta_net_client==0){margen=0}
              
                      innerHtml+= '     <td class="text-left">'+parseInt(margen)+'% </td>';
                  
              
              
              
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
      htmlField.defaultValue = generadorHtml(innerHtml, records.length,customrecord688,valor_dedia);
  
   
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
  
    function dias_TranscurridosDelMes(customrecord687,dia) {
      // Obtén la fecha actual
      var fechaActual = new Date();
  
      // Obtén el primer día del mes actual
      var mes_actual = customrecord687;
      var dia_consulta=dia;
      var primerDiaDelMes = new Date(fechaActual.getFullYear(), mes_actual, 1);
  
      // Inicializa el contador de días sin contar domingos y días festivos
      var diasSinDomingos = 0;
  
      // Itera sobre cada día desde el primer día del mes hasta la fecha actual
      for (var i = primerDiaDelMes.getDate(); i <= fechaActual.getDate(); i++) {
        // Crea una nueva fecha para el día actual del mes
        var fecha = new Date(fechaActual.getFullYear(), customrecord687, i);
  
        // Verifica si el día actual no es domingo (0 es domingo en JavaScript)
        if (fecha.getDay() !== 0) {
          // Verifica si el día actual no es un día festivo adicional
          if (!esDiaFestivoAdicional(fecha)) {
            // Incrementa el contador de días sin domingos ni días festivos
            diasSinDomingos++;
          }
        }
      }
  
  
      // Muestra el resultado en la consola o en algún elemento HTML
      if(mes_actual==1) {
         return 24;
      }
  if(mes_actual==12) {
         return 24;
      }
       if(mes_actual==2) {
        if(dia_consulta==29){dia_consulta=24;}
        
        else if (dia_consulta==28){dia_consulta=23;}
        else if (dia_consulta==27){dia_consulta=22;}
        else if (dia_consulta==26){dia_consulta=21;}
        else if (dia_consulta==24){dia_consulta=20;}
        else if (dia_consulta==23){dia_consulta=19;}
        else if (dia_consulta==22){dia_consulta=18;}
        else if (dia_consulta==21){dia_consulta=17;}
        else if (dia_consulta==20){dia_consulta=16;}
        else if (dia_consulta==19){dia_consulta=15;}
        else if (dia_consulta==17){dia_consulta=14;}
        else if (dia_consulta==16){dia_consulta=13;}
        else if (dia_consulta==15){dia_consulta=12;}
        else if (dia_consulta==14){dia_consulta=11;}
        else if (dia_consulta==13){dia_consulta=10;}
        else if (dia_consulta==12){dia_consulta=9;}
        else if(dia_consulta==10){dia_consulta=8;}
        else if(dia_consulta==9){dia_consulta=7;}
        else if(dia_consulta==8){dia_consulta=6;}
        else if(dia_consulta==7){dia_consulta=5;}
        else if(dia_consulta==6){dia_consulta=4;}
        else if(dia_consulta==5){dia_consulta=3;}
        else if(dia_consulta==4){dia_consulta=3;}
        else if(dia_consulta==3){dia_consulta=3;}
        else if(dia_consulta==2){dia_consulta=2;}
        else {dia_consulta=1;} 
          return dia_consulta;
      }
      if(mes_actual==3) {
        if(dia_consulta==29){dia_consulta=24;}
            else if(dia_consulta==14){dia_consulta=12;}
        
          else if(dia_consulta==13){dia_consulta=11;}
           else if(dia_consulta==12){dia_consulta=10;}
           else if(dia_consulta==11){dia_consulta=9;}
           else if(dia_consulta==10){dia_consulta=8;}else if(dia_consulta==9){dia_consulta=8;}
           else if(dia_consulta==8){dia_consulta=7;}
             else if(dia_consulta==7){dia_consulta=6;}
          else if(dia_consulta==6){dia_consulta=5;}
      else if(dia_consulta==5){dia_consulta=4;}
        else if(dia_consulta==4){dia_consulta=3;}
        else if(dia_consulta==3){dia_consulta=2;}
        else if(dia_consulta==2){dia_consulta=2;}
        else if(dia_consulta==1){dia_consulta=1;}
        else {dia_consulta=1;} 
          return dia_consulta;
      }
      else{
      return diasSinDomingos;
      }
  
    }
  
  
  function dias_Habiles_del_mes(customrecord688) {
    // Obtén la fecha actual
    var fechaActual = new Date();
    var mes_actual=customrecord688
    // Obtén el primer día del mes actual
    var primerDiaDelMes = new Date(fechaActual.getFullYear(),  fechaActual.getMonth(), 1);
  
    // Obtén el último día del mes actual
    var ultimoDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);
  
    // Inicializa el contador de días sin contar los domingos y días festivos
    var diasSinDomingos = 0;
  
    // Itera sobre cada día del mes
    for (var i = primerDiaDelMes.getDate(); i <= ultimoDiaDelMes.getDate(); i++) {
      // Crea una nueva fecha para el día actual del mes
      var fecha = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), i);
  
      // Verifica si el día actual no es domingo (0 es domingo en JavaScript)
      if (fecha.getDay() !== 0) {
        // Verifica si el día actual no es un día festivo adicional
        if (!esDiaFestivoAdicional(fecha)) {
          // Incrementa el contador de días sin domingos ni días festivos
          diasSinDomingos++;
        }
      }
    }
  
    // Muestra el resultado en la consola o en algún elemento HTML
  
    if(mes_actual==11){
      return diasSinDomingos-1;
  }
   else if(mes_actual==1){
      return diasSinDomingos-1;
  }
   else if(mes_actual==2){
      return diasSinDomingos-1;
  }
   else if(mes_actual==3){
      return diasSinDomingos-1;
  }
   else if(mes_actual==9){
      return diasSinDomingos-1;
  }
   else if(mes_actual==12){
      return diasSinDomingos-2;
  }
  else{
    // Muestra el resultado en la consola o en algún elemento HTML
     return diasSinDomingos;;
  }
   
  }
  
  // Función para verificar si una fecha es un día festivo adicional
  function esDiaFestivoAdicional(fecha) {
    var festivosAdicionales = [
      new Date(fecha.getFullYear(), 0, 1), // 1 de enero
      primerLunesDeFebrero(fecha.getFullYear()), // Primer lunes de febrero
      tercerLunesDeMarzo(fecha.getFullYear()), // Tercer lunes de marzo
      new Date(fecha.getFullYear(), 4, 1), // 1 de mayo
      new Date(fecha.getFullYear(), 8, 16), // 16 de septiembre
      tercerLunesDeNoviembre(fecha.getFullYear()), // Tercer lunes de noviembre
      new Date(2022, 11, 1), // 1 de diciembre de 2022 (puedes ajustar el año)
      new Date(fecha.getFullYear(), 11, 25) // 25 de diciembre
    ];
  
    return festivosAdicionales.some(function (festivo) {
      return fecha.getTime() === festivo.getTime();
    });
  }
  
  // Función para obtener el primer lunes de febrero
  function primerLunesDeFebrero(anio) {
    var primerDiaDeFebrero = new Date(anio, 1, 1);
    var diaDeLaSemana = primerDiaDeFebrero.getDay();
    var diasHastaLunes = (diaDeLaSemana === 1) ? 0 : (8 - diaDeLaSemana);
    var primerLunes = new Date(anio, 1, 1 + diasHastaLunes);
    return primerLunes;
  }
  
  // Función para obtener el tercer lunes de marzo
  function tercerLunesDeMarzo(anio) {
    var primerDiaDeMarzo = new Date(anio, 2, 1);
    var diaDeLaSemana = primerDiaDeMarzo.getDay();
    var diasHastaLunes = (diaDeLaSemana === 1) ? 14 : (21 - diaDeLaSemana);
    var tercerLunes = new Date(anio, 2, 1 + diasHastaLunes);
    return tercerLunes;
  }
  
  // Función para obtener el tercer lunes de noviembre
  function tercerLunesDeNoviembre(anio) {
    var primerDiaDeNoviembre = new Date(anio, 10, 1);
    var diaDeLaSemana = primerDiaDeNoviembre.getDay();
    var diasHastaLunes = (diaDeLaSemana === 1) ? 14 : (21 - diaDeLaSemana);
    var tercerLunes = new Date(anio, 10, 1 + diasHastaLunes);
    return tercerLunes;
  }
  
    function columnasXMeses(anio,mes,dia,mes_ini,dia_ini,anio,anio_ini,log){
      var str     = "";
      var campoSuma = "";
      var campostock  = "";
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
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
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
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+ fechaInicio + anio_anterior +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+ fechaFinal + anio_anterior +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) AS "+
          "venta_1_mes_futuro, "+
          " ";
  
      str+= "TO_DATE('"+ mes+"/"+dia+"/"+anio+"', 'MM/DD/YYYY') AS fecha_inicio_mes_f, ";
      str+= "TRUNC(LAST_DAY(TO_DATE('"+ fechaInicio + anio +"', 'MM/DD/YYYY'))) AS fecha_final_mes_f, ";
      // log.debug({title:"query", details:str});
  
      /** Total ventas */
      var venta_total ="Total_venta"
    
        str+= "SUM( "+
            " CASE WHEN "+
            "   1 = 1 "+
            "   AND N1.type IN('SalesOrd', 'CustCred' ) "+
            "   AND N1.trandate >= TO_DATE('"+ mes_ini +"/"+ dia_ini +"/"+ anio_ini +"', 'MM/DD/YYYY') "+
            "   AND N1.trandate <= TO_DATE('"+ mes +"/"+ dia +"/"+  anio +"', 'MM/DD/YYYY') "+
            " THEN N1.netamount * -1 "+
            " ELSE 0 "+
            " END) AS "+
            "tot_vtas , "+
            " ";
  
  
      
  
      /** Meses con inventario ***/
  
  
  
  
      /** Total ventas Piezas */
    
  
            
  
  
      
  
      /** stock */
    
      
  
        
  
      
      return str;
    }
  
  
  
    //////////////77
     function columnasXMeses1(anio,mes,dia,mes_ini,dia_ini,anio,anio_ini,log){
      var str     = "";
      var campoSuma = "";
      var campostock  = "";
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
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
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
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+ fechaInicio + anio_anterior +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+ fechaFinal + anio_anterior +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) AS "+
          "venta_1_mes_futuro, "+
          " ";
  
      str+= "TO_DATE('"+ mes+"/"+dia+"/"+anio+"', 'MM/DD/YYYY') AS fecha_inicio_mes_f, ";
      str+= "TRUNC(LAST_DAY(TO_DATE('"+ fechaInicio + anio +"', 'MM/DD/YYYY'))) AS fecha_final_mes_f, ";
      // log.debug({title:"query", details:str});
  
      /** Total ventas */
      var venta_total ="Total_venta"
    
        str+= "SUM( "+
            " CASE WHEN "+
            "   1 = 1 "+
            "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
            "   AND N1.trandate >= TO_DATE('"+ mes_ini +"/"+ dia_ini +"/"+ anio_ini +"', 'MM/DD/YYYY') "+
            "   AND N1.trandate <= TO_DATE('"+ mes +"/"+ dia +"/"+  anio +"', 'MM/DD/YYYY') "+
            " THEN N1.netamount * -1 "+
            " ELSE 0 "+
            " END) AS "+
            "vt2 , "+
            " ";
  
  
      
  
      /** Meses con inventario ***/
  
  
  
  
      /** Total ventas Piezas */
    
  
            
  
  
      
  
      /** stock */
    
      
  
        
  
      
      return str;
    }
  
  
    /////////////
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
            "stock1, "+
            " ";
  
  
      return str1;
    }
  
    function validarFecha(fecha){
  
      var parts = fecha.split("/");
      var day   = parseInt(parts[1], 10);
      var month = parseInt(parts[0], 10);
      var year  = parseInt(parts[2], 10);
  
      // Rangos de año y mes
      if(year < 1000 || year > 3000 || month == 0 || month > 12)
      return false;
  
      var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  
      // Años bisiestos
      if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;
  
      return day > 0 && day <= monthLength[month - 1];
    }
  
    ///aqui
      
  
    function generadorHtml(table, records,customrecord688,dias){
        
  
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
        html += '  $("#resultsTable").DataTable({'
        html += '      "order": [[2, "desc"]],'
        html += '      "pageLength": 500,'
        html += '      "initComplete": function() {'
        html += '          $("#resultsDiv").show();'
        html += '      },'
        html += '      "language": {'
        html += '          "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"'
        html += '      },'
        html += '      "buttons": ['
        html += '          {'
        html += '              extend: "excel"'
        html += '          }'
        html += '      ],'
        html += '      "dom": "lBpftip"'
        html += '  });'
        html += "var validaciontabla="+customrecord688+" ;"
        html += "  if(validaciontabla==10){"
        html += '  $("#resultsTable").on("search.dt", function() {';
        html += '      var searchValue = $("#resultsTable_filter input").val();';
        html += '      console.log("Valor del buscador:", searchValue);';
        
        html += '      var data = $("#resultsTable").DataTable().rows({ search: "applied" }).data();';
        html += '          var valor_compra=0;';
        html += '          var monto_rec=0;';
        html += '          var monto_rest=0;';
  
        html += '          var pedido=0;';
        html += '          var recibido=0;';
        html += '          var restante=0;';
        html += '      data.each(function(value, index) {';
        
        html += '          console.log("Fila " + (index + 1) + ":");';
      
        html += '          for (var prop in value) {';
        html += '  if(prop==1){'
        html += '             valor_compra+=parseFloat(value[prop]); '; 
        html += '          } ';
        html += '  else if(prop==2){'
        html += '             monto_rec+=parseFloat(value[prop]); '; 
        html += '          }';
        html += '  else if(prop==4){'
        html += '             monto_rest+=parseFloat(value[prop]); '; 
        html += '          }';
        html += '  else if(prop==7){'
        html += '             pedido+=parseFloat(value[prop]); '; 
        html += '          }';
        html += '  else if(prop==8){'
        html += '             recibido+=parseFloat(value[prop]); '; 
        html += '          }';
        html += '  else if(prop==10){'
        html += '             restante+=parseFloat(value[prop]); '; 
        html += '          }';
        html += '          }';
        html += '    }); ';
        html += ' var porc1=(monto_rec/valor_compra)*100 ;   valor_compra = valor_compra.toLocaleString("en-US", { style: "currency", currency: "USD" });';
  html += '    monto_rec = monto_rec.toLocaleString("en-US", { style: "currency", currency: "USD" });';
  html += '    monto_rest = monto_rest.toLocaleString("en-US", { style: "currency", currency: "USD" });';
  
        html += '  console.log("valor total " + valor_compra);  ';
        html += '  console.log("monto_rec " + monto_rec);  ';
        html += '  console.log("monto_rest " + monto_rest);  ';
  
        html += '  console.log("valor pedido " + pedido);  ';
        html += '  console.log("recibido " + recibido);  ';
        html += '  console.log("restante " + restante);  ';
  
        html += '$("#ttf").empty(); $("#ttf").append( `<tr><td  >Total</td> <td  ></td>   <td  class="precio text-right">`+valor_compra+`   </td> <td  class="precio text-right">`+monto_rec+`   </td><td class=" text-right">`+parseInt(porc1)+` %</td> <td  class="precio text-right">`+monto_rest+`   </td><td  class="text-right">  </td><td  class="text-right"> </td> <td  class="text-right">`+pedido+`  </td><td  class="text-right">`+recibido+`  </td><td  class="text-right">`+parseInt(100-((restante/pedido)*100))+`%  </td><td  class="text-right">`+restante+`  </td>      </tr>` ); ';
  
  
        html += '  });}';
  





        /////////////validacion 14
        html += "  if(validaciontabla==14){"
        html += '  $("#resultsTable").on("search.dt", function() {';
        html += '      var searchValue = $("#resultsTable_filter input").val();';
        html += '      console.log("Valor del buscador:", searchValue);';
        
        html += '      var data = $("#resultsTable").DataTable().rows({ search: "applied" }).data();';
        html += '          var venta=0;';
        html += '          var cantidad=0;';
 
        html += '      data.each(function(value, index) {';
        
        html += '          console.log("Fila " + (index + 1) + ":");';
      
        html += '          for (var prop in value) {';
        html += '  if(prop==2){'
        html += '             venta+=parseFloat(value[prop]); '; 
        html += '          } ';
        html += '  else if(prop==3){'
        html += '             cantidad+=parseFloat(value[prop]); '; 
        html += '          }';
   
      
        html += '          }';
        html += '    }); ';
   
  html += '    venta = venta.toLocaleString("en-US", { style: "currency", currency: "USD" });';

  

  
        html += '$("#ttf").empty(); $("#ttf").append( `<tr><td  ></td> <td  >Total</td>   <td  class="precio text-right">`+venta+`   </td> <td  class="precio text-right">`+parseInt(cantidad)+`   </td>      </tr>` ); ';
  
  
        html += '  });}';

        /////
  




                /////////////validacion 14
  
  
       
  
  
                
           
  innerHtml+= '   var filasPorPagina = 5;  '
  innerHtml+= '   var tabla = $("#resultsTable"); '
  innerHtml+= '   var tbody = tabla.find("tbody"); '
  innerHtml+= '   var paginacion = $("#paginacion"); '
  innerHtml+= '   var totalFilas = tbody.find("tr").length; '
  innerHtml+= '   var totalPaginas = Math.ceil(totalFilas / filasPorPagina); '
  innerHtml+= '   function mostrarPagina(pagina) { '
  innerHtml+= '       tbody.find("tr").hide(); '
  innerHtml+= '      var inicio = (pagina - 1) * filasPorPagina; '
  innerHtml+= '      var fin = inicio + filasPorPagina; '
  innerHtml+= '      tbody.find("tr").slice(inicio, fin).show(); '
  innerHtml+= '   } '
  innerHtml+= '   function generarEnlacesPaginacion() { '
  innerHtml+= '      paginacion.empty(); '
  innerHtml+= '      for (var i = 1; i <= totalPaginas; i++) { '
  innerHtml+= '         var enlace = $("<a href="#">" + i + "</a>"); '
  innerHtml+= '         enlace.click(function(event) { '
  innerHtml+= '            event.preventDefault(); '
  innerHtml+= '            var paginaSeleccionada = parseInt($(this).text(), 10); '
  innerHtml+= '            mostrarPagina(paginaSeleccionada); '
  innerHtml+= '         }); '
  innerHtml+= '         paginacion.append(enlace); '
  innerHtml+= '      } '
  innerHtml+= '   } '
  innerHtml+= '    mostrarPagina(1); '
            ////////////////validacion 6 
           /*   html += "  if(validaciontabla==6) { console.log('es 6 convertir tabla ');"
  
     html += "   function tablaToJson(tabla) { "
     html += "     var data = []; "
     html += "     $(tabla).find('tbody tr').each(function () { "
     html += "       var row = {}; "
     html += "       $(this).find('td').each(function (index, column) { "
     html += "         var columnName = $(tabla).find('thead th').eq(index).text(); "
     html += "         row[columnName] = $(column).text(); "
     html += "       }); "
     html += "       data.push(row); "
     html += "     }); "
     html += "    "
     html += "     return data; "
     html += "   } "
     html += "    "
     html += "   var jsonResult = tablaToJson('#resultsTable'); "
     html += "   var rl = JSON.stringify(jsonResult, null, 2); "
     html += "   var datos = JSON.parse(rl); "
     html += "   var datosAgrupados = {}; "
     html += "    "
     html += "   datos.forEach(function (elemento) { "
     html += "     var monto = elemento.marca; "
     html += "     if (!datosAgrupados[monto]) { "
     html += "       datosAgrupados[monto] = { "
     html += "         marca: elemento.marca, "
     html += "         total: 0, "
     html += "         detalles: [] "
     html += "       }; "
     html += "     } "
     html += "     datosAgrupados[monto].total += parseFloat(elemento.venta_neta); "
     html += "     datosAgrupados[monto].detalles.push({ "
     html += "       description: elemento.description, "
     html += "       venta_neta: parseFloat(elemento.venta_neta).toFixed(2) "
     html += "     }); "
     html += "   }); "
      html += "   var resultadoFinal = Object.values(datosAgrupados); "
     html += "   console.log(resultadoFinal); "
     html += "   var cl = JSON.stringify(resultadoFinal, null, 2); "
     html += "   var data = JSON.parse(cl); "
     html += "   var datos = data; "
     html += "   console.log(datos); "
     html += "    "
     html += "   var tabla = document.getElementById('tabla2'); "
     html += "   var encabezados = Object.keys(datos[0]); "
     html += "   var encabezadoRow = tabla.insertRow(); "
     html += "    "
     html += "   encabezados.forEach(function (encabezado) { "
     html += "     var th = document.createElement('th'); "
     html += "     th.textContent = encabezado; "
     html += "     encabezadoRow.appendChild(th); "
     html += "   }); "
     html += "    "
     html += "   datos.forEach(function (fila, index) { "
     html += "     var tr = tabla.insertRow(); "
     html += "    "
     html += "     encabezados.forEach(function (encabezado) { "
     html += "       var cell = tr.insertCell(); "
     html += "    "
     html += "       if (encabezado === 'venta_neta' || encabezado === 'total') { "
     html += "         cell.textContent = parseFloat(fila[encabezado]).toFixed(2); "
     html += "       } else { "
     html += "         cell.textContent = fila[encabezado]; "
     html += "       } "
     html += "     }); "
     html += "    "
    
    html += " var botonDetalles = document.createElement('input'); "
     html += "  botonDetalles.type = 'button'; "
      html += " botonDetalles.value = '+'; "
      html += " botonDetalles.className = 'btn btn-info'; "
      html += " botonDetalles.onclick = function () { "
     html += "       mostrarDetalles(index); "
     html += "     }; "
     html += "     tr.insertCell().appendChild(botonDetalles); "
     html += "    "
     html += "     var detallesDiv = document.createElement('div'); "
     html += "     detallesDiv.className = 'detalles'; "
     html += "     fila.detalles.forEach(function (detalle) { "
     html += "       var detalleP = document.createElement('p'); "
     html += "       detalleP.textContent = `${detalle.description}: ${detalle.venta_neta}`; "
     html += "       detallesDiv.appendChild(detalleP); "
     html += "     }); "
     html += "     tr.insertCell().appendChild(detallesDiv); "
     html += "   }); "
     html += "    "
     html += "   function mostrarDetalles(index) { "
     html += "     var detallesDiv = document.querySelectorAll('.detalles')[index]; "
     html += "     detallesDiv.style.display = detallesDiv.style.display === 'none' ? 'block' : 'none'; "
     html += "   } "
  
      html += " var botonDetalles = document.querySelectorAll('.btn-info'); "
       html += "  botonDetalles.forEach(function (boton) { "
         html += "  boton.click(); "
  
         html += " });"
  
  html += "  $('#resultsTable').hide(); "
  html += "  }  " */
  html += " else if(validaciontabla==6){"
  html += '  $("#resultsTable").on("search.dt", function() {';
  html += '      var searchValue = $("#resultsTable_filter input").val();';
  html += '      console.log("Valor del buscador:", searchValue);';
  
  html += '      var data = $("#resultsTable").DataTable().rows({ search: "applied" }).data();';
  html += '          var venta=0;';
  html += '          var cantidad=0;';
  html += '          var cantidad2=0;';
  html += '      data.each(function(value, index) {';
  
  html += '          console.log("Fila " + (index + 1) + ":");';

  html += '          for (var prop in value) {';
  html += '  if(prop==2){'
  html += '             cantidad2+=parseFloat(value[prop]); '; 
  html += '          } ';
  html += '  if(prop==3){'
  html += '             venta+=parseFloat(value[prop]); '; 
  html += '          } ';
  html += '  else if(prop==4){'
  html += '             cantidad+=parseFloat(value[prop]); '; 
  html += '          }';


  html += '          }';
  html += '    }); ';

html += '    venta = venta.toLocaleString("en-US", { style: "currency", currency: "USD" });';
html += '    cantidad = cantidad.toLocaleString("en-US", { style: "currency", currency: "USD" });';



html += '$("#ttf").empty();$("#ttf").append( `<tr><td  >Total</td><td  ></td>  <td class="text-right" > `+parseInt(cantidad2)+`</td><td class="precio text-right">`+venta+`</td> <td  class="precio text-right">`+cantidad+`   </td> </tr>` ); ';


  html += '  });}';




  /////////////////////////
  html += " else if(validaciontabla==3){ console.log('es3');"
  html += '  $("#resultsTable").on("search.dt", function() {';
  html += '      var searchValue = $("#resultsTable_filter input").val();';
  html += '      console.log("Valor del buscador:", searchValue);';
  
  html += '      var data = $("#resultsTable").DataTable().rows({ search: "applied" }).data();';
  html += '          var venta=0;';
  html += '          var cantidad=0;';
  html += '          var utilidad=0;';
  html += '      data.each(function(value, index) {';
  
  html += '          console.log("Fila " + (index + 1) + ":");';

  html += '          for (var prop in value) {';
  html += '  if(prop==2){'
  html += '             cantidad+=parseFloat(value[prop]); '; 
  html += '          } ';
  html += '  if(prop==3){'
  html += '             venta+=parseFloat(value[prop]); '; 
  html += '          } ';
  html += '  else if(prop==4){'
  html += '             utilidad+=parseFloat(value[prop]); '; 
  html += '          }';


  html += '          }';
  html += '    });  var porcent = parseInt((utilidad/venta)*100);';

html += '    venta = venta.toLocaleString("en-US", { style: "currency", currency: "USD" });';
html += '    utilidad = utilidad.toLocaleString("en-US", { style: "currency", currency: "USD" });';



html += '$("#ttf").empty();$("#ttf").append( `<tr><td  ></td> <td  >Total</td> <td  class="precio text-right">`+parseInt(cantidad)+`   </td> <td  class="precio text-right">`+venta+`   </td> <td  class="precio text-right">`+utilidad+`   </td><td  class="precio text-right">`+porcent+` %  </td>   </tr>` ); ';


  html += '  });}';

  /////////////////////
   
  
            ///////////77//vlidacion 6
   
     html += " else if(validaciontabla==9) {"
  

  
  
      html += ' }';
  
  
   
      /////////////// suma de columnas 
  
  /////////////suma de columnas 
      html += "var variable22="+customrecord688+" ;"
        html += "console.log('variable22 ' + variable22);"
  
  /////////////marca 
  
  
  
  
         html += "if(variable22==6){"
        ///////////
        html += "console.log('fue 6  ' + variable22);"
         html+="var venta_neta = 0;"
    html+="var venta_neta_2022 = 0;"
     html+="var venta_neta_2021 = 0;"
  
  
        html+="$('#resultsTable tbody').find('tr').each(function (i, el) {"
               
          //Voy incrementando las variables segun la fila ( .eq(0) representa la fila 1 )     
        
            html+=" venta_neta+= parseFloat($(this).find('td').eq(1).text());"
               html+=" venta_neta_2022+= parseFloat($(this).find('td').eq(3).text());"
                  html+=" venta_neta_2021+= parseFloat($(this).find('td').eq(4).text());"
               
        
                  
      html+="});"
  
  html += '$("#ttf").append( `<tr><td  >Total</td><td  ></td>  <td class="precio" > `+venta_neta+`</td><td class="precio">`+venta_neta_2022+`</td> <td  class="precio">`+venta_neta_2021+`   </td> </tr>` ); ';

  html += '  var indiceColumna2 = 3; '
   html += '  var indiceColumna6 = 4; '
 
       
   html += "      $('#resultsTable tbody tr').each(function(){"
         html += "     $(this).find('td').eq(indiceColumna6).addClass('precio'); "
           html += "     $(this).find('td').eq(indiceColumna2).addClass('precio'); })"

  
   html+="};"
  
  
  ///////////////////1
   html += "if(variable22==1){"
        ///////////
        html += "console.log('fue 10  ' + variable22);"
         html+="var venta_neta = 0;"
    html+="var venta_neta_2022 = 0;"
     html+="var venta_neta_2021 = 0;"
    html+="var utilidad = 0;"
     html+="var margen = 0;"
  
        html+="$('#resultsTable tbody').find('tr').each(function (i, el) {"
               
          //Voy incrementando las variables segun la fila ( .eq(0) representa la fila 1 )     
        
            html+=" venta_neta+= parseFloat($(this).find('td').eq(1).text());"
               html+=" venta_neta_2022+= parseFloat($(this).find('td').eq(2).text());"
                  html+=" venta_neta_2021+= parseFloat($(this).find('td').eq(3).text());"
                     html+=" utilidad+= parseFloat($(this).find('td').eq(4).text());"
                        html+=" margen+= utilidad/venta_neta;"
            
        
                  
      html+="});"
  
  html += '$("#ttf").append( `<tr><td  >Total</td>  <td class="precio text-right" > `+venta_neta+`</td><td class="precio text-right">`+venta_neta_2022+`</td> <td class=" text-right">`+Math.round((venta_neta_2022/venta_neta)*100)+` %  </td></tr>` ); ';
  
  
  
   html += '  var indiceColumna = 1; '
   html += '  var indiceColumna2 = 2; '
    html += '  var indiceColumna6 = 3; '
  
        
    html += "      $('#resultsTable tbody tr').each(function(){"
          html += "     $(this).find('td').eq(indiceColumna).addClass('precio'); "
            html += "     $(this).find('td').eq(indiceColumna2).addClass('precio'); "
            
    
    
    html += '      });'
    
  
   html+="};"
  
        //////////////1
  
   html += "if(variable22==10){"
        ///////////
  
  
        html += "var ultimoEncabezado = $('#resultsTable thead th:last-child');"
        html += "var indexUltimoEncabezado = $('#resultsTable thead th').length - 1;"
  
  
        html += "$('#resultsTable thead tr th').each(function(index) {"
     
          html += " if (index < indexUltimoEncabezado) {"
            html += "   var siguienteEncabezado = $(this).next();"
            html += " $(siguienteEncabezado).before($(this));"
           html += " }"
           html += "});"
  
           html += "var ultimaColumnaCeldas = $('#resultsTable tbody td:last-child');"
  
  
           html += "$('#resultsTable tbody tr').each(function() {"
    
            html += "  $(this).prepend(ultimaColumnaCeldas.eq($(this).index()));"
            html += "}); "
  
  
  
  
  
        html += "console.log('fue 10  ' + variable22);"
         html+="var total_col10 = 0;"
    html+="var total_col10 = 0;"
  
    html+="var total_col12 = 0;"
    html+="var col4 = 0;"
    html+="var col7 = 0;"
    html+="var col8 = 0;"
        html+="$('#resultsTable tbody').find('tr').each(function (i, el) {"
               
          //Voy incrementando las variables segun la fila ( .eq(0) representa la fila 1 )     
        
            html+=" total_col10+= parseFloat($(this).find('td').eq(2).text());"
            html+=" total_col12+= parseFloat($(this).find('td').eq(3).text());"
            html+=" col4+= parseFloat($(this).find('td').eq(4).text());"
            html+=" col7+= parseFloat($(this).find('td').eq(7).text());"
            html+=" col8+= parseFloat($(this).find('td').eq(8).text());"
   html += '  var indiceColumna = 2; '
   html += '  var indiceColumna2 = 3; '
    html += '  var indiceColumna6 = 5; '
     html += '  var indiceColumna7 = 8; '
        
    html += "      $('#resultsTable tbody tr').each(function(){"
          html += "     $(this).find('td').eq(indiceColumna).addClass('precio'); "
             html += "     $(this).find('td').eq(indiceColumna2).addClass('precio'); "
                 html += "     $(this).find('td').eq(indiceColumna6).addClass('precio'); "
  
    html += '      });'
  
        
                  
      html+="});  var restante=col7-col8;"
  
  html += '$("#ttf").append( `<tr><td  >Total</td> <td  ></td>   <td  class="precio text-right">`+total_col10+`   </td> <td  class="precio text-right">`+total_col12+`   </td><td  class="precio text-right">`+col4+`   </td><td  class="text-right">  </td><td  class="text-right"> </td> <td  class="text-right">`+col7+`  </td><td  class="text-right">`+col8+`  </td><td  class="text-right">`+parseInt((restante/col7)*100)+`%  </td><td  class="text-right">`+restante+`  </td>      </tr>` ); ';
  
  
  
  
  html += " $('#resultsTable tbody tr').each(function() {"
     
  html += " var cell = $(this).find('td:eq(10)');"
  html += " cell.text(cell.text() + '%');"
  html += "});"
  html += " $('#resultsTable tbody tr').each(function() {"
     
  html += " var cell = $(this).find('td:eq(4)');"
  html += " cell.text(cell.text() + '%');"
  html += "});"
  
  
   html+="};"

   ///////////14
   html += "if(variable22==14){"
       
  
   html+="var col1 = 2;"
   html+="var col2 = 3;"

      
     
       


       
   html += "      $('#resultsTable tbody tr').each(function(){"
         html += "     $(this).find('td').eq(col1).addClass('precio'); "
      
           
 
   html += '      });'
 
       
  

 

 
 
  html+="};"

   //////////14
  
    html += "if(variable22==7){"
        //////////
        html += "console.log('fue 7  ' + 7);"
         html+="var total_col10 = 0;"
    html+="var total_col10_val = 0;"
      html+="var total_col11 = 0;"
        html+="var total_col12 = 0;"
        html+=" var dd = 0;"   
        html+="$('#resultsTable tbody').find('tr').each(function (i, el) {"
               
          //Voy incrementando las variables segun la fila ( .eq(0) representa la fila 1 )     
          html+=" mostrar1= parseFloat($(this).find('td').eq(3).text());"
            html+=" mostrar2= parseFloat($(this).find('td').eq(4).text());"
            html+=" total_col10+= parseFloat($(this).find('td').eq(2).text());"
          
            

            html+=" if (isNaN(total_col10)) {"
            html+="total_col10_val+= 0;"
         html+="}"
          html+="else {"
             html+=" total_col10_val+= parseFloat($(this).find('td').eq(2).text());"
          html+=" }"

         html+=" if (isNaN(mostrar1)) {"
          html+="total_col12+= 0;"
       html+="}"
        html+="else {"
           html+=" total_col11+= parseFloat($(this).find('td').eq(3).text());"
        html+=" }"
           html+=" if (isNaN(mostrar2)) {"
          html+="total_col12+= 0;"
       html+="}"
        html+="else {"
           html+=" total_col12+= parseFloat($(this).find('td').eq(4).text());"
        html+=" }"
        html+="  dd = i;"   
      
  
            html+=" console.log('total_col12 '+ total_col12);"         
      html+="});"
      html+=" var utilidad = parseInt((total_col11/total_col10_val)*100);"     
  html += '$("#ttf").append( `<tr><td  >Total</td><td  ></td>   <td  class="precio text-right">`+total_col10_val+`  </td><td class="precio text-right">`+total_col11+` </td> <td  class=" text-right">`+parseInt(utilidad)+` %  </td> </tr>` ); ';
  
  
   html += '  var indiceColumna = 1; '
   html += '  var indiceColumna2 = 2; '
   html += '  var indiceColumna3 = 3; '
        
    html += "      $('#resultsTable tbody tr').each(function(){"
          html += "     $(this).find('td').eq(indiceColumna).addClass('precio'); "
            html += "     $(this).find('td').eq(indiceColumna2).addClass('precio'); "
            html += "     $(this).find('td').eq(indiceColumna3).addClass('precio'); "
   
    html += '      });'
  
  
   html+="};"
  
  
  html += "if(variable22==4){"
        ///////////
        html += "console.log('fue 4  ' + 4);"
         html+="var total_col10 = 0;"
         html+="var total_col10_2022 = 0;"
  html+="var total_col10_2021 = 0;"
   html+="var total_col11_2022 = 0;"
        html+="var col2  = 0;"
  html+="var col3  = 0;"
  html+="var col4 = 0;"
  html+="var col5 = 0;"
  html+="var col6 = 0;"
  
  html+="var col2_val  = 0;"
  html+="var col3_val  = 0;"
  html+="var col4_val = 0;"
  html+="var col5_val = 0;"
  html+="var col6_val = 0;"
  
        html+="$('#resultsTable tbody').find('tr').each(function (i, el) {"
               
          //Voy incrementando las variables segun la fila ( .eq(0) representa la fila 1 )     
    
            html+=" total_col10+= parseFloat($(this).find('td').eq(1).text());"
               html+=" total_col11_2022+= parseFloat($(this).find('td').eq(2).text());"
  
  
               html+=" col2_val+= parseFloat($(this).find('td').eq(2).text());"
               html+=" col3_val+= parseFloat($(this).find('td').eq(3).text());"
             
               html+=" col4_val+= parseFloat($(this).find('td').eq(4).text());"
               html+=" col5_val+= parseFloat($(this).find('td').eq(5).text());"
               html+=" col6_val+= parseFloat($(this).find('td').eq(6).text());"
  
      html+=" if (isNaN(total_col11_2022)) {"
          html+="total_col10_2022+= 0;"
       html+="}"
        html+="else {"
           html+=" total_col10_2022+= parseFloat($(this).find('td').eq(2).text());"
        html+=" }"
  
    
  
  
  
   
        html+=" if (isNaN(col2_val)) {"
        html+="col2+= 0;"
     html+="}"
      html+="else {"
         html+=" col2+= parseFloat($(this).find('td').eq(2).text());"
      html+=" }"
  
  
  
  
  
  
  
      html+=" if (isNaN(col3_val)) {"
      html+="col3+= 0;"
   html+="}"
    html+="else {"
       html+=" col3+= parseFloat($(this).find('td').eq(3).text());"
    html+=" }"
  
  
  
  
  
    html+=" if (isNaN(col4_val)) {"
    html+="col4+= 0;"
  html+="}"
  html+="else {"
     html+=" col4+= parseFloat($(this).find('td').eq(4).text());"
  html+=" }"
  
  
  
  
  
  
  
  html+=" if (isNaN(col5_val)) {"
  html+="col5+= 0;"
  html+="}"
  html+="else {"
   html+=" col5+= parseFloat($(this).find('td').eq(5).text());"
  html+=" }"
  
  
  html+=" if (isNaN(col6_val)) {"
  html+="col5+= 0;"
  html+="}"
  html+="else {"
   html+=" col6+= parseFloat($(this).find('td').eq(6).text());"
  html+=" }"
  
  
  
  
  
       
      html+="}); var col_valor1=col4/(total_col10/"+dias+"); col_valor3=col3/(total_col10_2022/"+dias+");"
  
  html += '$("#ttf").append( `<tr><td  class="text-right">Total</td>  <td  class="precio text-right">`+total_col10+`  </td>  <td class=" text-right"> `+parseInt(total_col10_2022)+` </td> <td  class="text-right"> `+parseInt(col3)+` </td>  <td  class="precio text-right"> `+col4+` </td> <td  class="  text-right"> `+parseInt(col_valor1)+` </td><td  class="text-right"> `+parseInt(col_valor3)+`   </td>    </tr>` ); ';
  
   html += '  var indiceColumna = 1; '
   html += '  var indiceColumna2 = 4; '
    html += '  var indiceColumna6 = 5; '
     html += '  var indiceColumna7 = 7; '
        
  
  
  
        
    html += "      $('#resultsTable tbody tr').each(function(){"
          html += "     $(this).find('td').eq(indiceColumna).addClass('precio'); "
   
          html += "     $(this).find('td').eq(indiceColumna2).addClass('precio'); "
       
    html += '      });'
  
  
  
  
  
  
  
   html += '  var indiceColumna3 = 3; '
  
  
  
  
  html += " $('#resultsTable tbody tr').each(function(){"
  html += " var contenido = $(this).find('td').eq(indiceColumna3).text();"
  html += " contenido = contenido.replace(/\.00$/, '');"
  html += " var valorEntero = parseInt(contenido, 10);"
  
  html += " if (!isNaN(valorEntero)) {"
  html += "    $(this).find('td').eq(indiceColumna3).text(valorEntero);"
  html += " } else {"
  
  html += "     $(this).find('td').eq(indiceColumna3).text(0);"
  html += " }"
  
  html += " });"
  
  
  
  
  
   html+="};"
  
   //////////////////////7
  html += "if(variable22==12){"
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
     
  
  
  html+="var cont = 0;"
  
        html+="$('#resultsTable tbody').find('tr').each(function (i, el) {"
               
          //Voy incrementando las variables segun la fila ( .eq(0) representa la fila 1 )     
    
  
  html+="col2_val+= parseFloat($(this).find('td').eq(2).text());"
  html+="col3_val+= parseFloat($(this).find('td').eq(3).text());"
  html+="col4_val+= parseFloat($(this).find('td').eq(4).text());"
  html+="col5_val+= parseFloat($(this).find('td').eq(5).text());"
  html+="col6_val+= parseFloat($(this).find('td').eq(6).text());"
  html+="col7_val+= parseFloat($(this).find('td').eq(7).text());"
  html+="col8_val+= parseFloat($(this).find('td').eq(8).text());"
  html+="col9_val+= parseFloat($(this).find('td').eq(9).text());"
  html+="col10_val+= parseFloat($(this).find('td').eq(10).text());"
  html+="col11_val+= parseFloat($(this).find('td').eq(11).text());"
  html+="col12_val+= parseFloat($(this).find('td').eq(12).text());"
  html+="col13_val+= parseFloat($(this).find('td').eq(13).text());"
  html+="col14_val+= parseFloat($(this).find('td').eq(14).text());"
  
  
     html+=" cont= i;"
  
  //
      html+=" if (isNaN(col2_val)) {"
          html+="col2+= 0;"
       html+="}"
        html+="else {"
           html+=" col2+= parseFloat($(this).find('td').eq(2).text());"
        html+=" }"
  //
       //
      html+=" if (isNaN(col3_val)) {"
          html+="col3+= 0;"
       html+="}"
        html+="else {"
           html+=" col3+= parseFloat($(this).find('td').eq(3).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col4_val)) {"
          html+="col4+= 0;"
       html+="}"
        html+="else {"
           html+=" col4+= parseFloat($(this).find('td').eq(4).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col5_val)) {"
          html+="col5+= 0;"
       html+="}"
        html+="else {"
           html+=" col5+= parseFloat($(this).find('td').eq(5).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col6_val)) {"
          html+="col6+= 0;"
       html+="}"
        html+="else {"
           html+=" col6+= parseFloat($(this).find('td').eq(6).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col7_val)) {"
          html+="col7+= 0;"
       html+="}"
        html+="else {"
           html+=" col7+= parseFloat($(this).find('td').eq(7).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col8_val)) {"
          html+="col8+= 0;"
       html+="}"
        html+="else {"
           html+=" col8+= parseFloat($(this).find('td').eq(8).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col9_val)) {"
          html+="col9+= 0;"
       html+="}"
        html+="else {"
           html+=" col9+= parseFloat($(this).find('td').eq(9).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col10_val)) {"
          html+="col10+= 0;"
       html+="}"
        html+="else {"
           html+=" col10+= parseFloat($(this).find('td').eq(10).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col11_val)) {"
          html+="col11+= 0;"
       html+="}"
        html+="else {"
           html+=" col11+= parseFloat($(this).find('td').eq(11).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col12_val)) {"
          html+="col12+= 0;"
       html+="}"
        html+="else {"
           html+=" col12+= parseFloat($(this).find('td').eq(12).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col13_val)) {"
          html+="col13+= 0;"
       html+="}"
        html+="else {"
           html+=" col13+= parseFloat($(this).find('td').eq(13).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col14_val)) {"
          html+="col14+= 0;"
       html+="}"
        html+="else {"
           html+=" col14+= parseFloat($(this).find('td').eq(14).text());"
        html+=" }"
  //
       
    
        
      html+="});"
  
  
    
      html+="var dias_Tot=col4/(col3/"+dias+");"
      html+="var porcent=parseInt((col8/col6)*100);"

      html+="var dias_Tot2=parseInt(col5/(col2/"+dias+"));"
  
  
   /*  8 entte 6
  <td  class="precio">`+col2+` </td><td  class="precio">`+col3+` </td><td  class="precio">`+col4+` </td><td  class="precio">`+col5+` </td><td  class="precio">`+col6+` </td><td  class="precio">`+col7+` </td><td  class="precio">`+col8+` </td><td  class="precio">`+col9+` </td><td  class="precio">`+col10+` </td><td  class="precio">`+col11+` </td><td  class="precio">`+col12+` </td><td  class="precio">`+col13+` </td><td  class="precio">`+col14+` </td>dias_Tot2
  */
  
  html += '$("#ttf").append( `<tr><td  >Total de items `+cont+`</td><td  >Total</td> <td  class=" text-right  precio">`+col2+` </td><td  class=" text-right ">`+col3.toFixed(2)+` </td><td  class=" text-right ">`+col4.toFixed(2)+` </td><td  class=" text-right  precio">`+col5.toFixed(2)+` </td><td  class=" text-right  precio">`+col6.toFixed(2)+` </td><td  class=" text-right  ">`+porcent+` </td>   <td  class=" text-right  precio">`+col8+` </td><td  class=" text-right  ">`+dias_Tot2+` </td><td  class=" text-right ">`+parseInt(dias_Tot)+` </td> </tr>` ); '; 
  
  
  
  
  
   html += '  var indiceColumna = 2; '
   html += '  var indiceColumna5 = 5; '
    html += '  var indiceColumna6 = 6; '
     html += '  var indiceColumna7 = 8; '
        
    html += "      $('#resultsTable tbody tr').each(function(){"
          html += "     $(this).find('td').eq(indiceColumna).addClass('precio'); "
            html += "     $(this).find('td').eq(indiceColumna5).addClass('precio'); "
              html += "     $(this).find('td').eq(indiceColumna6).addClass('precio'); "
                html += "     $(this).find('td').eq(indiceColumna7).addClass('precio'); "
    html += '      });'
  
  
  
   html += '  var indiceColumna8 = 9; '
  
  
   html += '  var indiceColumna88 = 7; '
     html += " $('#resultsTable tbody tr').each(function(){"
             html += " var contenido = $(this).find('td').eq(indiceColumna8).text();"
              
            
  
             html += " contenido = contenido.replace(/\.00$/, '');"
  
             html += " $(this).find('td').eq(indiceColumna8).text(contenido);"
  
  
  
                    html += " var contenido = $(this).find('td').eq(indiceColumna88).text();"
              
            
  
             html += " contenido = contenido.replace(/\.00$/, '');"
  
            
             html += " $(this).find('td').eq(indiceColumna88).text(contenido+'%');"
         html += " });"
  
  
   html+="};"
  
  /////////////////13
  
   html += "if(variable22==13){"
   ///////////
   html += "console.log('fue 4  ' + 4);"
    html+="var total_col10 = 0;"
    html+="var total_col10_2022 = 0;"
  html+="var total_col10_2021 = 0;"
  html+="var total_col11_2022 = 0;"
   html+="var col2  = 0;"
  html+="var col3  = 0;"
  html+="var col4 = 0;"
  html+="var col5 = 0;"
  html+="var col6 = 0;"
  
  html+="var col2_val  = 0;"
  html+="var col3_val  = 0;"
  html+="var col4_val = 0;"
  html+="var col5_val = 0;"
  html+="var col6_val = 0;"
  
   html+="$('#resultsTable tbody').find('tr').each(function (i, el) {"
          
     //Voy incrementando las variables segun la fila ( .eq(0) representa la fila 1 )     
  
       html+=" total_col10+= parseFloat($(this).find('td').eq(1).text());"
          html+=" total_col11_2022+= parseFloat($(this).find('td').eq(2).text());"
  
  
          html+=" col2_val+= parseFloat($(this).find('td').eq(2).text());"
          html+=" col3_val+= parseFloat($(this).find('td').eq(3).text());"
        
          html+=" col4_val+= parseFloat($(this).find('td').eq(4).text());"
          html+=" col5_val+= parseFloat($(this).find('td').eq(5).text());"
          html+=" col6_val+= parseFloat($(this).find('td').eq(6).text());"
  
  html+=" if (isNaN(total_col11_2022)) {"
     html+="total_col10_2022+= 0;"
  html+="}"
   html+="else {"
      html+=" total_col10_2022+= parseFloat($(this).find('td').eq(2).text());"
   html+=" }"
  
  
  
  
  
  
   html+=" if (isNaN(col2_val)) {"
   html+="col2+= 0;"
  html+="}"
  html+="else {"
    html+=" col2+= parseFloat($(this).find('td').eq(2).text());"
  html+=" }"
  
  
  
  
  
  
  
  html+=" if (isNaN(col3_val)) {"
  html+="col3+= 0;"
  html+="}"
  html+="else {"
  html+=" col3+= parseFloat($(this).find('td').eq(3).text());"
  html+=" }"
  
  
  
  
  
  html+=" if (isNaN(col4_val)) {"
  html+="col4+= 0;"
  html+="}"
  html+="else {"
  html+=" col4+= parseFloat($(this).find('td').eq(4).text());"
  html+=" }"
  
  
  
  
  
  
  
  html+=" if (isNaN(col5_val)) {"
  html+="col5+= 0;"
  html+="}"
  html+="else {"
  html+=" col5+= parseFloat($(this).find('td').eq(5).text());"
  html+=" }"
  
  
  html+=" if (isNaN(col6_val)) {"
  html+="col5+= 0;"
  html+="}"
  html+="else {"
  html+=" col6+= parseFloat($(this).find('td').eq(6).text());"
  html+=" }"
  
  
  
  
  
  
   
  html+="}); var col_valor1=col4/(total_col10/"+dias+"); col_valor3=col3/(total_col10_2022/"+dias+");"
  
  html += '$("#ttf").append( `<tr><td  class="text-right">Total</td>  <td  class="precio text-right">`+total_col10+`  </td><td class=" text-right"> `+parseInt(total_col10_2022)+` </td> <td  class="text-right"> `+parseInt(col3)+` </td><td  class="precio text-right"> `+col4+` </td> <td  class="  text-right"> `+parseInt(col_valor1)+` </td><td  class="text-right"> `+parseInt(col_valor3)+` </td>    </tr>` ); ';
  html += '  var indiceColumna = 1; '
  html += '  var indiceColumna2 = 4; '
  html += '  var indiceColumna6 = 5; '
  html += '  var indiceColumna7 = 7; '
   
  
  
  
   
  html += "      $('#resultsTable tbody tr').each(function(){"
     html += "     $(this).find('td').eq(indiceColumna).addClass('precio'); "
       
   
     html += "     $(this).find('td').eq(indiceColumna2).addClass('precio'); "
  html += '      });'
  
  
  
  
  
  
  
  html += '  var indiceColumna3 = 3; '
  
  
  
  
  html += " $('#resultsTable tbody tr').each(function(){"
  html += " var contenido = $(this).find('td').eq(indiceColumna3).text();"
  html += " contenido = contenido.replace(/\.00$/, '');"
  html += " var valorEntero = parseInt(contenido, 10);"
  
  html += " if (!isNaN(valorEntero)) {"
  html += "    $(this).find('td').eq(indiceColumna3).text(valorEntero);"
  html += " } else {"
  
  html += "     $(this).find('td').eq(indiceColumna3).text(0);"
  html += " }"
  
  html += " });"
  
  
  
   html+="};"
  
  
  
   /////////////////
  
  
   ///////////////// 12
  
  
     html += "if(variable22==9){"
      
  
   html+="};"
  
   html += "if(variable22==3){"
    ////////////////////////
    html += "console.log('fue 3  ' + 3);"
         html+="var total_col10 = 0;"
    html+="var total_col10 = 0;"
      html+="var total_col11 = 0;"
        html+="var total_col12 = 0;"
        html+="var tnew = 0;"
        html+="$('#resultsTable tbody').find('tr').each(function (i, el) {"
               
          //Voy incrementando las variables segun la fila ( .eq(0) representa la fila 1 )     
          html+=" mostrar1= parseFloat($(this).find('td').eq(3).text());"
            html+=" mostrar2= parseFloat($(this).find('td').eq(4).text());"
            html+=" tnew= parseFloat($(this).find('td').eq(2).text());"
          
    
         html+=" if (isNaN(mostrar1)) {"
          html+="total_col12+= 0;"
       html+="}"
        html+="else {"
           html+=" total_col12+= parseFloat($(this).find('td').eq(3).text());"
        html+=" }"
           html+=" if (isNaN(mostrar2)) {"
           html+="total_col11+= 0;"
       html+="}"
        html+="else {"
           html+=" total_col11+= parseFloat($(this).find('td').eq(4).text());"
        html+=" }"

        html+=" if (isNaN(tnew)) {"
        html+="tnew+= 0;"
     html+="}"
      html+="else {"
         html+=" tnew+= parseFloat($(this).find('td').eq(2).text());"
      html+=" }"
    
      html+="});"
  
  html += '$("#ttf").append( `<tr><td  ></td> <td  >Total</td> <td  class="precio text-right">`+tnew+`  </td>  <td  class="precio text-right">`+total_col12+`  </td><td class=" text-right">`+total_col11+` </td> <td  class="precio text-right">`+tnew+`  % </td> </tr>` ); ';
 
  
  

  
  
        
    html += "      $('#resultsTable tbody tr').each(function(){"
          html += "     $(this).find('td').eq(3).addClass('precio'); "
          html += "     $(this).find('td').eq(4).addClass('precio'); "
          html += "     $(this).find('td').eq(4).addClass('precio'); " 
             
          html += "     $(this).find('td').eq(5).addClass('porcentaje'); "
    
    html += '      });'
  

    /////////////
  
   html+="};"
  
   html += "if(variable22==111){"
        ///////////
        html += "console.log('fue 10  ' + variable22);"
         html+="var total_col10 = 0;"
    html+="var total_col10 = 0;"
      html+="var total1 = 0;"
      html+="var total2 = 0;"
        html+="$('#resultsTable tbody').find('tr').each(function (i, el) {"
               
          //Voy incrementando las variables segun la fila ( .eq(0) representa la fila 1 )     
        
            html+=" total_col10+= parseFloat($(this).find('td').eq(1).text());"
            
          
            html+=" total1+= parseFloat($(this).find('td').eq(1).text());"
  
            html+=" total2+= parseFloat($(this).find('td').eq(2).text());"
                  
      html+="});"
  
  
  
  html += '$("#ttf").append( `<tr><td  >Total</td> <td  class="precio">`+total1+`   </td><td  class="precio">`+total2+`   </td><td  class="precio">`+total2+`   </td> </tr>` ); ';
   html+="$('#resultsTable tr').each(function() {"
  
        
      
      html+="});"
   html+="};"
  
   
   html += "if(variable22==5){"
        ///////////
        html += "console.log('fue 5  ' + 5);"
         html+="var total_col10 = 0;"
    html+="var total_col10 = 0;"
      html+="var total_col11 = 0;"
        html+="var total_col12 = 0;"
        html+="var tnew = 0;"
        html+="$('#resultsTable tbody').find('tr').each(function (i, el) {"
               
          //Voy incrementando las variables segun la fila ( .eq(0) representa la fila 1 )     
          html+=" mostrar1= parseFloat($(this).find('td').eq(1).text());"
            html+=" mostrar2= parseFloat($(this).find('td').eq(3).text());"
            html+=" total_col10+= parseFloat($(this).find('td').eq(1).text());"
          
    
         html+=" if (isNaN(mostrar1)) {"
          html+="total_col12+= 0;"
       html+="}"
        html+="else {"
           html+=" total_col11+= parseFloat($(this).find('td').eq(2).text());"
        html+=" }"
           html+=" if (isNaN(mostrar2)) {"
          html+="tnew+= 0;"
       html+="}"
        html+="else {"
           html+=" tnew+= parseFloat($(this).find('td').eq(3).text());"
        html+=" }"
  
            html+=" console.log('total_col11 '+ total_col11);"     
  
            html+=" console.log('total_col12 '+ total_col12);"         
      html+="});"
  
  html += '$("#ttf").append( `<tr><td  >Total</td>  <td  class="precio text-right">`+total_col12+`  </td><td class=" text-right">`+total_col11+` </td> <td  class="precio text-right">`+tnew+`  % </td> </tr>` ); ';
   html+="$('#resultsTable tr').each(function() {"
          html+="$(this).find('td:eq(4), th:eq(4)').hide(); "
        
        
      html+="});"
  
  
   html += '  var indiceColumna = 1; '
   html += '  var indiceColumna2 = 2; '
  
  
        
    html += "      $('#resultsTable tbody tr').each(function(){"
          html += "     $(this).find('td').eq(indiceColumna).addClass('precio'); "
          html += "     $(this).find('td').eq(3).addClass('precio'); "

             
    
    
    html += '      });'
  
   html+="};"
  
  
  
   html += "if(variable22==2){"
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
     
  
  
  html+="var cont = 0;"
  
        html+="$('#resultsTable tbody').find('tr').each(function (i, el) {"
               
          //Voy incrementando las variables segun la fila ( .eq(0) representa la fila 1 )     
    
  
  html+="col2_val+= parseFloat($(this).find('td').eq(2).text());"
  html+="col3_val+= parseFloat($(this).find('td').eq(3).text());"
  html+="col4_val+= parseFloat($(this).find('td').eq(4).text());"
  html+="col5_val+= parseFloat($(this).find('td').eq(5).text());"
  html+="col6_val+= parseFloat($(this).find('td').eq(6).text());"
  html+="col7_val+= parseFloat($(this).find('td').eq(7).text());"
  html+="col8_val+= parseFloat($(this).find('td').eq(8).text());"
  html+="col9_val+= parseFloat($(this).find('td').eq(9).text());"
  html+="col10_val+= parseFloat($(this).find('td').eq(10).text());"
  html+="col11_val+= parseFloat($(this).find('td').eq(11).text());"
  html+="col12_val+= parseFloat($(this).find('td').eq(12).text());"
  html+="col13_val+= parseFloat($(this).find('td').eq(13).text());"
  html+="col14_val+= parseFloat($(this).find('td').eq(14).text());"
  
  
     html+=" cont= i;"
  
  //
      html+=" if (isNaN(col2_val)) {"
          html+="col2+= 0;"
       html+="}"
        html+="else {"
           html+=" col2+= parseFloat($(this).find('td').eq(2).text());"
        html+=" }"
  //
       //
      html+=" if (isNaN(col3_val)) {"
          html+="col3+= 0;"
       html+="}"
        html+="else {"
           html+=" col3+= parseFloat($(this).find('td').eq(3).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col4_val)) {"
          html+="col4+= 0;"
       html+="}"
        html+="else {"
           html+=" col4+= parseFloat($(this).find('td').eq(4).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col5_val)) {"
          html+="col5+= 0;"
       html+="}"
        html+="else {"
           html+=" col5+= parseFloat($(this).find('td').eq(5).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col6_val)) {"
          html+="col6+= 0;"
       html+="}"
        html+="else {"
           html+=" col6+= parseFloat($(this).find('td').eq(6).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col7_val)) {"
          html+="col7+= 0;"
       html+="}"
        html+="else {"
           html+=" col7+= parseFloat($(this).find('td').eq(7).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col8_val)) {"
          html+="col8+= 0;"
       html+="}"
        html+="else {"
           html+=" col8+= parseFloat($(this).find('td').eq(8).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col9_val)) {"
          html+="col9+= 0;"
       html+="}"
        html+="else {"
           html+=" col9+= parseFloat($(this).find('td').eq(9).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col10_val)) {"
          html+="col10+= 0;"
       html+="}"
        html+="else {"
           html+=" col10+= parseFloat($(this).find('td').eq(10).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col11_val)) {"
          html+="col11+= 0;"
       html+="}"
        html+="else {"
           html+=" col11+= parseFloat($(this).find('td').eq(11).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col12_val)) {"
          html+="col12+= 0;"
       html+="}"
        html+="else {"
           html+=" col12+= parseFloat($(this).find('td').eq(12).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col13_val)) {"
          html+="col13+= 0;"
       html+="}"
        html+="else {"
           html+=" col13+= parseFloat($(this).find('td').eq(13).text());"
        html+=" }"
  //
       
       //
      html+=" if (isNaN(col14_val)) {"
          html+="col14+= 0;"
       html+="}"
        html+="else {"
           html+=" col14+= parseFloat($(this).find('td').eq(14).text());"
        html+=" }"
  //
       
    
        
      html+="});"
  
  
    
  
      html+="var dias_Tot=col4/(col3/"+dias+");"
      
      html+="var util=parseInt((col8/col6)*100);"
   /*  8 entte 6
  <td  class="precio">`+col2+` </td><td  class="precio">`+col3+` </td><td  class="precio">`+col4+` </td><td  class="precio">`+col5+` </td><td  class="precio">`+col6+` </td><td  class="precio">`+col7+` </td><td  class="precio">`+col8+` </td><td  class="precio">`+col9+` </td><td  class="precio">`+col10+` </td><td  class="precio">`+col11+` </td><td  class="precio">`+col12+` </td><td  class="precio">`+col13+` </td><td  class="precio">`+col14+` </td>
  */
  html+="var dias_Tot2=parseInt(col5/(col2/"+dias+"));"
  html += '$("#ttf").append( `<tr><td  >Total de items `+cont+`</td><td  >Total</td> <td  class=" text-right  precio">`+col2+` </td><td  class=" text-right ">`+col3.toFixed(2)+` </td><td  class=" text-right ">`+col4.toFixed(2)+` </td><td  class=" text-right  precio">`+col5.toFixed(2)+` </td><td  class=" text-right  precio">`+col6.toFixed(2)+` </td><td  class=" text-right  ">`+util+` </td>   <td  class=" text-right  precio">`+col8+` </td><td  class=" text-right  ">`+dias_Tot2+` </td><td  class=" text-right ">`+parseInt(dias_Tot)+` </td> </tr>` ); '; 
  
  

  
  
  /*  8 entte 6
 <td  class="precio">`+col2+` </td><td  class="precio">`+col3+` </td><td  class="precio">`+col4+` </td><td  class="precio">`+col5+` </td><td  class="precio">`+col6+` </td><td  class="precio">`+col7+` </td><td  class="precio">`+col8+` </td><td  class="precio">`+col9+` </td><td  class="precio">`+col10+` </td><td  class="precio">`+col11+` </td><td  class="precio">`+col12+` </td><td  class="precio">`+col13+` </td><td  class="precio">`+col14+` </td>dias_Tot2
 */
 
 
  
  
  
   html += '  var indiceColumna = 2; '
   html += '  var indiceColumna5 = 5; '
    html += '  var indiceColumna6 = 6; '
     html += '  var indiceColumna7 = 8; '
        
    html += "      $('#resultsTable tbody tr').each(function(){"
          html += "     $(this).find('td').eq(indiceColumna).addClass('precio'); "
            html += "     $(this).find('td').eq(indiceColumna5).addClass('precio'); "
              html += "     $(this).find('td').eq(indiceColumna6).addClass('precio'); "
                html += "     $(this).find('td').eq(indiceColumna7).addClass('precio'); "
    html += '      });'
  
  
  
   html += '  var indiceColumna8 = 9; '
  
  
   html += '  var indiceColumna88 = 7; '
     html += " $('#resultsTable tbody tr').each(function(){"
             html += " var contenido = $(this).find('td').eq(indiceColumna8).text();"
              
            
  
             html += " contenido = contenido.replace(/\.00$/, '');"
  
             html += " $(this).find('td').eq(indiceColumna8).text(contenido);"
  
  
  
                    html += " var contenido = $(this).find('td').eq(indiceColumna88).text();"
              
            
  
             html += " contenido = contenido.replace(/\.00$/, '');"
  
            
             html += " $(this).find('td').eq(indiceColumna88).text(contenido+'%');"
         html += " });"
   html+="};"
  
   /////////////////
  
  html += "if(variable22==11){"
        ///////////
        html += "console.log('fue 11  ' + 11);"
         html+="var total_col10 = 0;"
    html+="var total_col10 = 0;"
      html+="var total_col11 = 0;"
        html+="var total_col11_b = 0;"
            html+="var total_col11_val = 0;"
        html+="var total_col12 = 0;"
        html+="$('#resultsTable tbody').find('tr').each(function (i, el) {"
               
          //Voy incrementando las variables segun la fila ( .eq(0) representa la fila 1 )     
          html+=" mostrar1= parseFloat($(this).find('td').eq(1).text());"
            html+=" mostrar2= parseFloat($(this).find('td').eq(2).text());"
            
              html+=" total_col11_val= parseFloat($(this).find('td').eq(3).text());"
          
  
   html+=" if (isNaN(total_col11_val)) {"
          html+="total_col12+= 0;"
       html+="}"
        html+="else {"
           html+=" total_col11_b+= parseFloat($(this).find('td').eq(3).text());"
        html+=" }"
  
  
    
         html+=" if (isNaN(mostrar1)) {"
          html+="total_col12+= 0;"
       html+="}"
        html+="else {"
           html+=" total_col11+= parseFloat($(this).find('td').eq(1).text());"
        html+=" }"
           html+=" if (isNaN(mostrar2)) {"
          html+="total_col12+= 0;"
       html+="}"
        html+="else {"
           html+=" total_col12+= parseFloat($(this).find('td').eq(2).text());"
        html+=" }"
  
            html+=" console.log('total_col11 '+ total_col11);"     
  
            html+=" console.log('total_col12 '+ total_col12);"         
      html+="});"
  
  html += '$("#ttf").append( `<tr><td  >Total</td> <td class="text-right precio">`+total_col11+` </td> <td  class=" text-right precio">`+total_col12+`   </td><td  class=" text-right precio">`+total_col11_b+`   </td> <td  class=" text-right ">`+parseInt(((total_col12/total_col11)*100))+` %  </td>   </tr>` ); ';
  
  
  
  
  
  
  
  
   html += '  var indiceColumna = 1; '
   html += '  var indiceColumna5 = 2; '
    html += '  var indiceColumna3 = 3; '
        
    html += "      $('#resultsTable tbody tr').each(function(){"
          html += "     $(this).find('td').eq(indiceColumna).addClass('precio'); "
            html += "     $(this).find('td').eq(indiceColumna5).addClass('precio'); "
               html += "     $(this).find('td').eq(indiceColumna3).addClass('precio'); "
  
    html += '      });'
  
  
  
    html += " $('#resultsTable tbody tr').each(function() {"
     
      html += " var cell = $(this).find('td:eq(4)');"
      html += " cell.text(cell.text() + '%');"
      html += "});"
  
   html+="};"
   //////////77
    html += 'var precios = document.querySelectorAll(".precio");';
   html += ' precios.forEach(function(precio) {';
     html += ' var valor = parseFloat(precio.textContent);';
         html += ' if (isNaN(valor)) { '
        html += '  precio.textContent = precio.textContent;';
          html += ' } else { '
        html += '  precio.textContent = valor.toLocaleString("en-US", { style: "currency", currency: "USD" });';
           html += '} '
  
  
  
  
  
    html += '});';
    
    html += "$('#resultsTable .porcentaje').each(function() {"
    html += ' var contenido = $(this).text();' 
    html += "$(this).text(contenido + '%');"
    html += '});'
    html += " var ventasReales = [];"
   html += " var sucursales = [];"
                html += "$('#resultsTable tbody tr').each(function () {"
              
                   html += " var ventaRealText = $(this).find('td:nth-child(2)').text().trim();"
  
                  html += " var ventaRealText2 = $(this).find('td:nth-child(1)').text().trim();"
                    html += "var ventaRealValue = parseFloat(ventaRealText.replace(/[$,]/g, ''));"
  
                
                    html += "ventasReales.push(ventaRealValue);"
                     html += "sucursales.push(ventaRealText2);"
                html += "});"
  
              // Mostrar el array en la consola (puedes hacer lo que quieras con los valores)
                html += 'console.log("Ventas Reales Array:", ventasReales);'
  
        html += 'console.log("Ventas Reales Array:", sucursales);'
     html += " function getRandomPastelColor() {"
               html += " var maxBrightness = 150;"
               html += " var letters = '0123456789ABCDEF';"
               html += " var color = '#';"
               html += " for (var i = 0; i < 3; i++) {"
                  // Ajusta la intensidad del componente RGB para obtener colores pastel
                  html += "  var component = Math.floor(Math.random() * maxBrightness);"
                  // Convierte a hexadecimal
                   html += " var hex = component.toString(16);"
                  // Asegura que el valor hexadecimal tenga dos dígitos
                  html += "  hex = hex.length === 1 ? '0' + hex : hex;"
                   html += " color += hex;"
               html += " }"
              html += "  return color;"
           html += " }"
  
          // Crear gráfico de pie con colores pastel
           html += " var coloresPastel = sucursales.map(function () {"
               html += " return getRandomPastelColor();"
           html += " });"
  
         
       html += 'var objetivoDia = [];'
       html += 'var ventaReal = [];'
  
   html += 'var margenOB = [];'
    html += 'var margenreal = [];'
  
       html += '$("#resultsTable tbody tr").each(function() {'
         html += 'var sucursal = $(this).find("td:eq(0)").text();'
         html += 'var objetivoDiaValue = parseFloat($(this).find("td:eq(2)").text().replace(/[^0-9.-]+/g, ""));'
         html += 'var ventaRealValue = parseFloat($(this).find("td:eq(2)").text().replace(/[^0-9.-]+/g, ""));'
        
         html += 'var margen_obj = parseFloat($(this).find("td:eq(6)").text().replace(/[^0-9.-]+/g, ""));'
         html += 'var margen_eal = parseFloat($(this).find("td:eq(7)").text().replace(/[^0-9.-]+/g, ""));'
  
             html += 'margenOB.push(margen_obj);'
         html += 'margenreal.push(margen_eal);'
  
         html += 'objetivoDia.push(objetivoDiaValue);'
         html += 'ventaReal.push(ventaRealValue);'
       html += '});'
  
      // Crear la gráfica con Chart.js
     
  
     
          html += '</script>';
      return html;
    }
  
    function contarDomingos(fechaInicio, fechaFinal){
      var fechaInicio   = fechaInicio.split("/");
      var fechaFinal    = fechaFinal.split("/");
      var fechaInicio_s = new Date(fechaInicio[2], parseInt(fechaInicio[1] - 1), parseInt(fechaInicio[0]));
      var fechaFinal_s  = new Date(fechaFinal[2], parseInt(fechaFinal[1] - 1), parseInt(fechaFinal[0]));
      var contDomingos  = 0;
      while(fechaFinal_s >= fechaInicio_s){
        if (fechaInicio_s.getDay() == 0) { // Es domingo
          contDomingos++;
        }
        fechaInicio_s.setDate(fechaInicio_s.getDate() + 1);
      }
  
      return contDomingos;
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
  