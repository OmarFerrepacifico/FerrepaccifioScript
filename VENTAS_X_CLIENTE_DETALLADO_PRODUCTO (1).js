/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 *
 */

define(['N/query', 'N/log', 'N/ui/serverWidget', 'N/runtime'], function(query, log, serverWidget, runtime){

    function onRequest(context){
  
          var delimiter     = /\u0005/;
  
  
        
            var cliente        = context.request.method == 'POST' ? context.request.parameters.custpage_cliente : "";
  var cantidad        = context.request.method == 'POST' ? context.request.parameters.custpage_selectfield : "";
            
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
        title: 'Ventas por cliente detallado producto',
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
  
  
      var cliente1 = form.addField({
          id: "custpage_cliente",
          type: serverWidget.FieldType.SELECT,
          label: "cliente",
          source: "Customer",
          container: 'grupofiltros'
        }).setHelpText({ help: "Obtener El marca" });
        cliente1.isMandatory = false;
        cliente1.defaultValue = cliente;
  
  var selectField = form.addField({
          id : 'custpage_selectfield',
          type : serverWidget.FieldType.SELECT,
          container: 'grupofiltros',
          label : 'Filtrar por :'
        });
        selectField.addSelectOption({
          value : 1,
          text : 'Facturas'
        });
  
        selectField.addSelectOption({
          value : 2,
          text : 'Articulos'
        });
     
     
        selectField.isMandatory = true;
        selectField.defaultValue = cantidad;
  
  
  
  
  
  /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 04/07/2023-----------------------*/
  
  
  
  
  
  
  /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 04/07/2023-----------------------*/
  
  
  
  
  
      if (context.request.method == 'POST') {
  
       
      innerHtml = "";
  
      var coluna=""
  
      
            ventadias=  "SUM( "+
                " CASE WHEN "+
                "   1 = 1 "+
                "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
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
                "Stock, "+
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
      valor_dedia=(dias1432*2)-dias143222
            )
      
            ventadias1=  "ROUND(SUM( "+
                " CASE WHEN "+
                "   1 = 1 "+
                "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
                "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
                "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
                " THEN N1.stock * -1 "+
                " ELSE 0 "+
                " END)/"+Math.round(valor_dedia)+" ,2) AS "+
                " dias_inventario, "+
                " ";
      
      
            vtas_x_dia=  "ROUND(SUM( "+
                " CASE WHEN "+
                "   1 = 1 "+
                "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
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
                "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
                "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
                "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
                " THEN N1.stock * -1 "+
                " ELSE 0 "+
                " END)/"+Math.round(valor_dedia)+")) AS "+
                " vdt22, "+
                " ";
      
             
      
      //, ROUND((COALESCE(costo_promedio/NULLIF(total_Ingresos,0),0)-1)*-100) porcentual
            /** SQL principal */
        
            cliente
          
           var restado 
           if(mes_ini==1){
            restado==15.43
           }
           if(mes_ini==2){
            restado==0
           }
      var sqlPrincipal= "";
var resta =0;
var resta2 =0;
if(anio_ini==2023){

  resta=171;
}

if(anio_ini==2023){

  resta2=171;
}
else{
  if(mes_ini==3){
     resta2=8000;
  }
  else{
     resta2=0;
  }
}


   
        
      
           if(cantidad ==1){
       
  

      
                sqlPrincipal= " select total_Ingresos.tranid Factura,((COALESCE(total_ingresos,0)-(COALESCE(valor_1_para__el_5,0)+COALESCE(valor_2_para__el_5,0)))-(COALESCE(DEVOLUCIONES,0)+COALESCE(prec_pactado,0))) Venta_neta ,                ROUND((((COALESCE(total_ingresos,0)-(COALESCE(valor_1_para__el_5,0)+COALESCE(valor_2_para__el_5,0)))-(COALESCE(DEVOLUCIONES,0)+COALESCE(prec_pactado,0)))-CostoTotal)+ COALESCE(DEVOLUCIONES_Compra,0),2) Utilidad_en_pesos,  ROUND((ROUND((((COALESCE(total_ingresos,0)-(COALESCE(valor_1_para__el_5,0)+COALESCE(valor_2_para__el_5,0)))-(COALESCE(DEVOLUCIONES,0)+COALESCE(prec_pactado,0)))-CostoTotal)+ COALESCE(DEVOLUCIONES_Compra,0),2) /((COALESCE(total_ingresos,0)-(COALESCE(valor_1_para__el_5,0)+COALESCE(valor_2_para__el_5,0)))-(COALESCE(DEVOLUCIONES,0)+COALESCE(prec_pactado,0))))*100,0) utilidad,   fecha from(SELECT      "+
          "   sum(netamount)*-1 total_Ingresos ,   tranid ,transaction .entity,transaction .tranDate  fecha"+
          "   FROM       "+
          "     transaction    join transactionline on transactionline.transaction=transaction.id     "+
          "       where    transactionline.itemtype='InvtPart'       "+
          "     AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')       "+
          "      AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')     "+
          "     and transaction .type='CustInvc' and   transaction .entity="+cliente+"  group by   "+
          "      tranid,transaction .entity,transaction .tranDate ) as  total_Ingresos  left join   "+
            "     (select      "+
          "    sum(netamount)*-1 valor_1_para__el_5  , tranid  "+
          "   FROM       "+
          "    transaction    join transactionline on transactionline.transaction=transaction.id    "+
          "      where   transactionline.itemtype='InvtPart'        "+
          "     AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')       AND  "+
          "     transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  "+
          "     and transaction .type='CustInvc'  and transaction.terms not  in(4,20 ) group by tranid )as  valor_1_para__el_5 on  "+
          "     total_Ingresos.tranid=valor_1_para__el_5.tranid    "+
          "     left join   "+
          "     (select      "+
          "    sum(netamount)*.95 valor_2_para__el_5,  tranid ,transaction .entity "+
          "   FROM       "+
          "    transaction    join transactionline on transactionline.transaction=transaction.id    "+
          "      where   transactionline.itemtype='InvtPart'        "+
          "     AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')       AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  "+
          "             "+
          "     and transaction .type='CustInvc'  and transaction.terms not  in(4,20 ) group by  tranid,transaction .entity)as  valor_2_para__el_5 on  "+
          "     total_Ingresos.tranid=valor_2_para__el_5.tranid   "+
           "      left join   "+
          "   (SELECT       "+
          "   sum(netamount)  DEVOLUCIONES,   tranid ,transaction .entity"+
          "   FROM      "+
          "    transaction    join transactionline on transactionline.transaction=transaction.id   "+
          "     where   transactionline.itemtype='InvtPart'         "+
          "     AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')       AND       "+
          "   transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  and transaction .type in ('CustCred')   "+
          "   group by tranid,transaction .entity)  as  DEVOLUCIONES on total_Ingresos.tranid=DEVOLUCIONES.tranid    "+
             "   left join    "+
          "   (SELECT       "+
          "   sum(netamount) prec_pactado,  tranid ,transaction .entity"+
          "   FROM      "+
          "    transaction    join transactionline on transactionline.transaction=transaction.id   "+
          "       where   transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')       AND       "+
          "   transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  and transaction .type in ('CustCred')  and  "+
          "    custbody_bex_tiponc  in (1)        "+
          "   and transactionline.item = 19012      "+
          "   group by tranid,transaction .entity)as  prec_pactado on total_Ingresos.tranid=prec_pactado.tranid     "+
          
                 "    left join"+
    "  (Select ROUND(sum(DEVOLUCIONES_Compra),2) DEVOLUCIONES_Compra, tranid ,entity  from   "+
    " (SELECT      "+
    " ROUND(quantity,2)* ROUND(costestimaterate,2)  DEVOLUCIONES_Compra,   ,  tranid,transaction .entity    "+
    "   FROM     "+
    "    transaction    join transactionline on transactionline.transaction=transaction.id  "+
  
    "where   transactionline.itemtype='InvtPart'      "+
    "     AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')        AND      "+
    "   transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')   "+
    "   and transaction .type in ('CustCred') ) group by   tranid,entity)  "+
    "      DEVOLUCIONES_Compra on total_Ingresos.tranid=DEVOLUCIONES_Compra.tranid  "+
    

     "    left join"+
    "         (Select ROUND(sum(CostoTotal),2)*-1 CostoTotal, tranid ,entity    from   "+
    " (SELECT      "+
    " ROUND(quantity,2)* ROUND(costestimaterate,2)  CostoTotal,  ,  tranid,transaction .entity    "+
    "   FROM     "+
    "    transaction    join transactionline on transactionline.transaction=transaction.id  "+
  
    "where   transactionline.itemtype='InvtPart'      "+
    "     AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')        AND      "+
    "   transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')  and type in ('CustInvc') ) "+
    "   group by   tranid,entity)  CostoTotal       on total_Ingresos.tranid=CostoTotal.tranid    "
          
   
        
           }

           else if(cantidad ==2){


            /////////////////////////////////
 var sqlPrincipal= "select item.displayname codigo,itm.*from(select articulo,venta_neta,cantidad, ROUND(Utilidad,2) utilidad_en_pesos ,round((ROUND(Utilidad,2)/venta_neta)*100,0)utilidad   from (select  total_Ingresos.desc articulo, total_Ingresos.cantidad*-1 cantidad ,  "+
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
  "    and transaction .type='SalesOrd' and   transaction .entity="+cliente+"   and   transaction .entity="+cliente+" group by    transactionline.item,item.description) as  total_Ingresos left join  "+
  "  (select      "+
  "   sum(netamount)*-1 valor_1_para__el_5  ,   transactionline.item itm,item.description desc "+
  "  FROM      "+
  "   transaction join transactionline on transactionline.transaction=transaction.id   "+
  "join item on  transactionline.item=item .id   "+
  "     where   transactionline.itemtype='InvtPart'       "+
  "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')         "+
  "    and transaction .type='SalesOrd' and   transaction .entity="+cliente+"    and terms not  in(4,20 ) group by   transactionline.item,item.description)as  valor_1_para__el_5 on total_Ingresos.itm=valor_1_para__el_5.itm left join  "+
  " "+
  "    (select      "+
  "   sum(netamount)*.95 valor_2_para__el_5,   transactionline.item itm,item.description  desc "+
  "  FROM      "+
  "   transaction join transactionline on transactionline.transaction=transaction.id   "+
  "join item on  transactionline.item=item .id    "+
  " "+
  "     where   transactionline.itemtype='InvtPart'       "+
  "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      AND transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')         "+
  "    and transaction .type='SalesOrd' and   transaction .entity="+cliente+"    and terms not  in(4,20 ) group by   transactionline.item,item.description)as  valor_2_para__el_5 on total_Ingresos.itm=valor_2_para__el_5.itm left join  "+
  "  (SELECT       "+
  "  sum(netamount)  DEVOLUCIONES,   transactionline.item itm ,item.description  desc "+
  "  FROM     "+
  "   transaction join transactionline on transactionline.transaction=transaction.id   "+
  "join item on  transactionline.item=item .id    "+
  "    where   transactionline.itemtype='InvtPart'        "+
  "    AND transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      AND      "+
  "  transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') and transaction .type in ('CustCred')and   transaction .entity="+cliente+"  "+
  "  group by  transactionline.item,item.description)  as  DEVOLUCIONES on total_Ingresos.itm=DEVOLUCIONES.itm   left join  "+
  
  
  
  
  
  
  
  
  
  "  (Select ROUND(sum(CostoTotal),2)*-1 CostoTotal,desc articulo,itm itm  from    "+
  "  (SELECT       "+
  

  "  ROUND(quantity,2)* ROUND(costestimaterate,2)  CostoTotal,  transactionline.item itm,item.description desc    "+
  "    FROM      "+
  "     transaction join transactionline on transactionline.transaction=transaction.id   "+
  "     join item on  transactionline.item=item .id     "+
  " where   transactionline.itemtype='InvtPart'       "+
  "      AND transaction .tranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')       AND       "+
  "    transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')    and transaction .type in ('SalesOrd') and   transaction .entity="+cliente+"   ) group by  desc,itm )as  CostoTotal on total_Ingresos.itm=CostoTotal.itm  left join "  +
  
  
  
  
  
  
  "  (Select ROUND(sum(DEVOLUCIONES_Compra),2)*1 DEVOLUCIONES_Compra,desc articulo,itm itm  from    "+
  "  (SELECT       "+
  
  
  "  ROUND(quantity,2)* ROUND(costestimaterate,2)  DEVOLUCIONES_Compra,  transactionline.item itm,item.description desc    "+
  "    FROM      "+
  "     transaction join transactionline on transactionline.transaction=transaction.id   "+
  "     join item on  transactionline.item=item .id     "+
  " where   transactionline.itemtype='InvtPart'       "+
  "      AND transaction .tranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')       AND       "+
  "    transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')    and transaction .type in ('CustCred')and   transaction .entity="+cliente+"   ) group by  desc,itm )as  DEVOLUCIONES_Compra on total_Ingresos.itm=DEVOLUCIONES_Compra.itm   union all " + 
  
  
  
  "  SELECT       "+
  "  item.description articulo,0,sum(netamount)*-1 Venta_neta ,0,0 "+
  "  FROM     "+
  "   transaction join transactionline on transactionline.transaction=transaction.id  "+
  "join item on  transactionline.item=item .id    "+
  "      where   transaction .tranDate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')      AND      "+
  "  transaction .tranDate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') and transaction .type in ('CustCred') and   transaction .entity="+cliente+"   and  custbody_bex_tiponc  in (1)       "+ 
  "  and transactionline.item = 19012     "+
  "  group by   transactionline.item,item.description  )) as itm join item on itm.articulo=item.description"

            //////////////////
       
      
      

    
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
  
      innerHtml = "";
  
   
      innerHtml = "";
  
      var dias1432 =Dias_diferencia(f_Inicio, f_Final);
      var dias143222 =contarDomingos(f_Inicio, f_Final);
  var ff111=Dias_diferencia(f_Inicio, f_Final);
    var valor_dedia=0
  if(dias1432==0){
  valor_dedia=1
  }else(
  valor_dedia=(dias1432*2)-dias143222
  )
  cliente
        
  
      innerHtml+= ' <br/> <br/> <br/><table style="table-layout: fixed; width: 300%; border-spacing: 6px;">';
      innerHtml+= ' <br/> <br/> <br/><table style="table-layout: fixed; width: 300%; border-spacing: 6px;">';
    
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
      htmlField.defaultValue = generadorHtml(innerHtml, records.length,f_Inicio ,f_Final,cantidad,anio_ini);
  
   
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
      
  
    function generadorHtml(table, records,f_Inicio ,f_Final,cantidad,anioini){
      var dias1432 =Dias_diferencia(f_Inicio, f_Final);
      var dias143222 =contarDomingos(f_Inicio, f_Final);
  var ff111=Dias_diferencia(f_Inicio, f_Final);
    var valor_dedia=0
  if(dias1432==0){
  valor_dedia=1
  }else(
  valor_dedia=(dias1432*2)-dias143222
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

          html += ' var anio ='+anioini+'; var resta=0; if (anio==2023){resta=98475.31;}else{resta=0;}';
              html += ' $("#submitter").click(function(){$("#myModal").modal("show")});';
  
              html += ' $("#resultsTable").DataTable({';
  
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
  html += ' var validacion="'+cantidad+'"; console.log(validacion);';
  
  ////////////////
  
  html += 'if(validacion==1){  $("#resultsTable").on("search.dt", function() {';
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
  html += '  else if(prop==3){'
  html += '             monto_rest+=parseFloat(value[prop]); '; 
  html += '          }';
  html += '  else if(prop==4){'
  html += '             pedido+=parseFloat(value[prop]); '; 
  html += '          }';
  html += '  else if(prop==5){'
  html += '             recibido+=parseFloat(value[prop]); '; 
  html += '          }';
  html += '  else if(prop==6){'
  html += '             restante+=parseFloat(value[prop]); '; 
  html += '          }';
  html += '          }';
  html += '    }); ';
  html += ' var porc1=parseInt((monto_rec/valor_compra)*100) ;  valor_compra =  valor_compra ; valor_compra = valor_compra.toLocaleString("en-US", { style: "currency", currency: "USD" });';
  html += '    monto_rec = monto_rec.toLocaleString("en-US", { style: "currency", currency: "USD" });';
  html += '    monto_rest = monto_rest.toLocaleString("en-US", { style: "currency", currency: "USD" });';
  
  html += '  console.log("valor total " + valor_compra);  ';
  html += '  console.log("monto_rec " + monto_rec);  ';
  html += '  console.log("monto_rest " + monto_rest);  ';
  
  html += '  console.log("valor pedido " + pedido);  ';
  html += '  console.log("recibido " + recibido);  ';
  html += '  console.log("restante " + restante);  ';
  
  html += '$("#ttf").empty(); $("#ttf").append( `<tr><td  >Total de articulos `+cont+`</td><td  class="precio  text-right ">`+valor_compra+` </td> <td  class="precio text-right ">`+monto_rec+` </td><td  class=" text-right  ">`+porc1+`% </td></tr>` ); ';  
  
  
  html += '  });'
      
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
    
  
  html+="col2_val+= parseFloat($(this).find('td').eq(1).text());"
  html+="col3_val+= parseFloat($(this).find('td').eq(2).text());"
  html+="col4_val+= parseFloat($(this).find('td').eq(3).text());"
  html+="col5_val+= parseFloat($(this).find('td').eq(4).text());"
  
  
  
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
  
  
    
  
      html+="var dias_Tot=col4/(col3/"+valor_dedia+");"
    
  
   /*  8 entte 6
  <td  class="precio">`+col2+` </td><td  class="precio">`+col3+` </td><td  class="precio">`+col5+` </td><td  class="precio">`+col5+` </td><td  class="precio">`+col6+` </td><td  class="precio">`+col7+` </td><td  class="precio">`+col8+` </td><td  class="precio">`+col9+` </td><td  class="precio">`+col10+` </td><td  class="precio">`+col11+` </td><td  class="precio">`+col12+` </td><td  class="precio">`+col13+` </td><td  class="precio">`+col14+` </td>
  */
  
  html += '$("#ttf").append( `<tr><td  >Total de articulos `+cont+`</td><td  ></td><td  class="precio  text-right ">`+col2+` </td><td  ></td> <td  class="precio text-right ">`+col3+` </td><td  class=" text-right  ">`+parseInt((col3/col2)*100)+`% </td><td  class="precio text-right  ">`+col5+` </td></tr>` ); ';  
  
  
  
  
  
   html += '  var indiceColumna = 1; '
   html += '  var indiceColumna5 = 2; '
    html += '  var indiceColumna6 = 3; '
     html += '  var indiceColumna7 = 6; '
        
    html += "      $('#resultsTable tbody tr').each(function(){"
    html += "     $(this).find('td').eq(indiceColumna).addClass('precio'); "
    html += "     $(this).find('td').eq(indiceColumna5).addClass('precio'); "   
    html += "     $(this).find('td').eq(indiceColumna6).addClass('porcentaje'); "
    html += '      }); } '



////////////////2
html += 'if(validacion==2){  $("#resultsTable").on("search.dt", function() {';
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
html += '  if(prop==2){'
html += '             valor_compra+=parseFloat(value[prop]); '; 
html += '          } ';
html += '  else if(prop==3){'
html += '             monto_rec+=parseFloat(value[prop]); '; 
html += '          }';
html += '  else if(prop==4){'
html += '             monto_rest+=parseFloat(value[prop]); '; 
html += '          }';

html += '          }';
html += '    }); ';
html += ' var porc1=parseInt((monto_rest/valor_compra)*100) ; valor_compra =  valor_compra;  valor_compra = valor_compra.toLocaleString("en-US", { style: "currency", currency: "USD" });';
html += '   ';
html += '    monto_rest = monto_rest.toLocaleString("en-US", { style: "currency", currency: "USD" });';

html += '  console.log("valor total " + valor_compra);  ';
html += '  console.log("monto_rec " + monto_rec);  ';
html += '  console.log("monto_rest " + monto_rest);  ';

html += '  console.log("valor pedido " + pedido);  ';
html += '  console.log("recibido " + recibido);  ';
html += '  console.log("restante " + restante);  ';

html += '$("#ttf").empty(); $("#ttf").append( `<tr><td  >Total de articulos `+cont+`</td><td  ></td><td  class="precio  text-right ">`+valor_compra+` </td> <td  class="precio text-right ">`+monto_rec+` </td><td  class="precio text-right ">`+monto_rest+` </td><td  class=" text-right  ">`+porc1+`% </td></tr>` ); ';  


html += '  });'
    
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
  

html+="col2_val+= parseFloat($(this).find('td').eq(1).text());"
html+="col3_val+= parseFloat($(this).find('td').eq(2).text());"
html+="col4_val+= parseFloat($(this).find('td').eq(3).text());"
html+="col5_val+= parseFloat($(this).find('td').eq(4).text());"



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


  

    html+="var dias_Tot=col4/(col3/"+valor_dedia+");"
  

 /*  8 entte 6
<td  class="precio">`+col2+` </td><td  class="precio">`+col3+` </td><td  class="precio">`+col5+` </td><td  class="precio">`+col5+` </td><td  class="precio">`+col6+` </td><td  class="precio">`+col7+` </td><td  class="precio">`+col8+` </td><td  class="precio">`+col9+` </td><td  class="precio">`+col10+` </td><td  class="precio">`+col11+` </td><td  class="precio">`+col12+` </td><td  class="precio">`+col13+` </td><td  class="precio">`+col14+` </td>
*/

html += '$("#ttf").append( `<tr><td  >Total de articulos `+cont+`</td><td  ></td><td  class="precio  text-right ">`+col2+` </td> <td  class="precio text-right ">`+col3+` </td><td  class=" text-right  ">`+parseInt((col3/col2)*100)+`% </td><td  class="precio text-right  ">`+col5+` </td></tr>` ); ';  





 html += '  var indiceColumna = 2; '
 html += '  var indiceColumna5 = 4; '
  html += '  var indiceColumna6 = 5; '
   html += '  var indiceColumna7 = 6; '
      
  html += "      $('#resultsTable tbody tr').each(function(){"
  html += "     $(this).find('td').eq(indiceColumna).addClass('precio'); "
  html += "     $(this).find('td').eq(indiceColumna5).addClass('precio'); "   
  html += "     $(this).find('td').eq(indiceColumna6).addClass('porcentaje'); "
  html += '      }); } '


////////////////























  
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
  
  
    html += "$('#resultsTable .porcentaje').each(function() {"
      html += ' var contenido = $(this).text();' 
      html += "$(this).text(contenido + '%');"
      html += '});'
  
          html += '</script>';
      return html;
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
  
      str+= "TO_DATE('"+ mes+"/"+dia+"/"+anio+"', 'MM/DD/YYYY') AS fecha_inicio_mes_f, ";
      str+= "TRUNC(LAST_DAY(TO_DATE('"+ fechaInicio + anio +"', 'MM/DD/YYYY'))) AS fecha_final_mes_f, ";
      // log.debug({title:"query", details:str});
  
      /** Total ventas */
      var venta_total ="Total_venta"
    
        str+= "SUM( "+
            " CASE WHEN "+
            "   1 = 1 "+
            "   AND N1.type IN('CustInvc', 'CustCred' ) "+
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
  