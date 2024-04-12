/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 *
 */

define(['N/query', 'N/log', 'N/ui/serverWidget', 'N/runtime'], function(query, log, serverWidget, runtime){

    function onRequest(context){

      var currentUser = runtime.getCurrentUser();
      var userId = currentUser.id;
      var requestUser = context.request.headers['User-Agent'];
      var requestIP = context.request.headers['X-Forwarded-For'];
  
      log.debug('ID de usuario:', userId);
      log.debug('Usuario que hace la solicitud:', requestUser);
      log.debug('Dirección IP del cliente:', requestIP);
  
      // Respuesta
      context.response.write('El ID de usuario es: ' + userId + '<br>');
      context.response.write('Usuario que hace la solicitud: ' + requestUser + '<br>');
      context.response.write('Dirección IP del cliente: ' + requestIP);
      var delimiter     = /\u0005/;
      var ubicaciones     = context.request.method == 'POST' ? context.request.parameters.custpage_location.split(delimiter) : '17,6,5,1,2,4,23,3,24,9';
      var id_Art        = context.request.method == 'POST' ? context.request.parameters.custpage_field_id_articulo : "";
      var sub_linea     = context.request.method == 'POST' ? context.request.parameters.custpage_sublinea.split(delimiter) : '';
      var linea_principal   = context.request.method == 'POST' ? context.request.parameters.custpage_linea_principal : "";
      var cantidad        = context.request.method == 'POST' ? context.request.parameters.custpage_selectfield : "";
      /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 05/07/2023-----------------------*/
      var ncp   = context.request.method == 'POST' ? context.request.parameters.custpage_nombre_corto_proveedor : "";
   var marca1        = context.request.method == 'POST' ? context.request.parameters.custpage_marca : "";
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
        title: 'Planeador de la Compra',
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
      form.clientScriptModulePath = './genPedidos.js';  
      form.addSubmitButton( { label: 'Generar Reporte' } );
     form.addButton({
          id: 'otra_accion2',
          label: 'Generar Pedido',
          functionName: 'Aprovacion_de_Analisis'
      });
      
        var locations = form.addField({
        id: "custpage_location",
        type: serverWidget.FieldType.MULTISELECT,
        label: "Ubicaciones",
        source: "location",
        container: 'grupofiltros'
      }).setHelpText({ help: "Seleccionar al menos una sucursal" });
      locations.isMandatory = true;
      locations.defaultValue = ubicaciones;
      
  
  
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
  
  ///
  
  
    var marc1a = form.addField({
        id: "custpage_marca",
        type: serverWidget.FieldType.SELECT,
        label: "marca",
        source: "customrecord681",
        container: 'grupofiltros'
      }).setHelpText({ help: "Obtener El marca" });
      marc1a.isMandatory = false;
      marc1a.defaultValue = marca1;
  
      //
  
  
  
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
  
  
      
      var selectField = form.addField({
          id : 'custpage_selectfield',
          type : serverWidget.FieldType.SELECT,
          container: 'grupofiltros',
          label : 'Top Low'
        });
        selectField.addSelectOption({
          value : 'V',
          text : 'Todos'
        });
  
        selectField.addSelectOption({
          value : 'T',
          text : 'SI'
        });
        
        selectField.addSelectOption({
          value : 'F',
          text : 'NO'
        });
      
     
        selectField.isMandatory = true;
        selectField.defaultValue = cantidad;
    
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
        var cantidad_2="";
        if(cantidad=="V"){
          cantidad_2=''
        }
        if(cantidad=="F"){
          cantidad_2="and custrecord_toplow='F'"
        }
        if(cantidad=="T"){
          cantidad_2="and custrecord_toplow='T'"
        }
        
  
  var valor_subl=sub_linea.length 
  var val_validacion =  "AND itm.custitem_bex_sublinea IN("+sub_linea+")"
  var validador = 0
  if( val_validacion=="AND itm.custitem_bex_sublinea IN()")
  {validador=0
    coluna="  "
  }
  else {
    validador=1
      coluna="N1.sublinea AS Sub_linea,"
  }
  
    if(linea_principal> 0 ){
      coluna="  N1.linea AS linea_principal,"
  }
   else if(ncp> 0 ){
      coluna="N1.am_12 as Nombre_C_Prov,"
  }
   else if(validador> 0 ){
        coluna="N1.sublinea AS Sub_linea,"
  }
  
  
        ventadias=  "(SUM( "+
            "CASE WHEN "+
            "   1 = 1 "+
            "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
            "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
            "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
            " THEN N1.stock * -1 "+
            " ELSE 0 "+
            " END)) AS "+
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
  
  if(marca1==2){
  valor_cc="Truper"}
  if(marca1==1){
  valor_cc="Xtools"}
  if(marca1==3){
  valor_cc="Xtools"}
  if(marca1==4){
  valor_cc="Xtools"}
          
  var wh=""
  if(marca1!=""){
  wh="  join customrecord681 on N2.custitem15=customrecord681.id where customrecord681.id='"+marca1+"'  "+cantidad_2 +"";
  }else{ 
      if(cantidad=="V"){
          cantidad_3=''
        }
        if(cantidad=="F"){
          cantidad_3="where custrecord_toplow='F'"
        }
        if(cantidad=="T"){
          cantidad_3="where custrecord_toplow='T'"
        }
      
      wh=cantidad_3
  }
  
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
        "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
        "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
        "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
        " THEN N1.stock * -1 "+
        " ELSE 0 "+
        " END)/"+Math.round(valor_dedia)+" ,2) AS "+
        " dias_inventario, "+
        " ";
  
        vtas_x_dia=  "(ROUND(SUM( "+
            " CASE WHEN "+
            "   1 = 1 "+
            "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
            "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY') "+
            "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
            " THEN N1.stock * -1 "+
            " ELSE 0 "+
            " END)/"+Math.round(valor_dedia)+" )) AS "+
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
  
  
  
  
        /** SQL principal */
        var sqlPrincipal= "SELECT N2.* FROM ( "+
        " SELECT  "+
                "   SUM( "+
      "     CASE WHEN "+
      "       1 = 1 "+
      "       AND N1.type IN('PurchOrd') "+
      "       AND N1.status IN('D', 'A', 'B', 'E', 'F') "+
      "     THEN N1.stock - N1.cantidadRecibida "+
      "     ELSE 0 "+
      "     END)                AS pendiente_recibir, "+
        "N1.am_12 as Nombre_C_Prov, N1.displayname Codigo, N1.description AS Nombre,      "+
    
            " "+ columnasXMeses(anio,mes,dia,mes_ini,dia_ini,anio,anio_ini,log) +
  
      ""+ventadias+""+
  ""+ventadias1+""+
       ""+vtas_x_dia+""+
  
    "N1.quantityonorder AS quantityonorder,"+
      
  
        
  
        "   N1.stockUbicacionPPedido    AS Punto_de_pedido, "+
        "   N1.stockUbicacionOptimo     AS Stock_Optimo, "+
        "     ROUND (N1.stockDisponible)        AS stock, "+
  
  
  
        "   (CASE WHEN "+
        "     1 = 1 "+
        "     AND N1.stockDisponible < N1.stockUbicacionOptimo "+
        "     AND N1.stockDisponible IS NOT NULL "+
        "     AND N1.stockUbicacionOptimo IS NOT NULL THEN "+
        "     N1.stockUbicacionOptimo - N1.stockDisponible "+
        "   ELSE 0 END )          AS sugerido_compra ,"+ 
            "   N1.custitem4    AS custitem4 ,"+
                "   N1.custitem15    AS custitem15 ,"+
                 "   N1.id    AS idart ,"+
                 "   N1.custrecord_toplow    AS custrecord_toplow,  "+
                 "   N1.location    AS sucursal "+
      
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
        "     inl.reorderpoint      AS stockUbicacionPPedido, "+
        "     inl.quantityavailable   AS stockDisponible, "+
        "     tra.trandate        AS trandate, "+
        "     tra.approvalstatus      AS approvalstatus ,"+ 
               "   inl.quantityonorder AS quantityonorder,"+
               "   itmconfig.custrecord_toplow AS custrecord_toplow,"+
  "   itm.custitem15 AS custitem15,"+
  "     tra.terms      AS terms ,"+   
                "SubF.name As am_99 ,Departamento.name As am_11,Familia.name am_10,NCP.name am_12 "+
                "   FROM Item AS itm "+
                "     INNER JOIN TransactionLine AS trl ON trl.Item = itm.ID "+
                "     INNER JOIN Transaction AS tra ON tra.id = trl.Transaction "+
                "     INNER JOIN location AS loc ON loc.id = trl.location "+
                "     INNER JOIN inventoryitemlocations AS inl ON inl.Item = itm.ID AND inl.location = loc.id "+ 
                "     INNER JOIN itemlocationconfiguration AS itmconfig ON itmconfig.Item = itm.ID AND itmconfig.location = loc.id "+  
                
                // Stock por ubicaciones
                "     INNER JOIN CUSTOMRECORD_BEX_LINEAS_ARTICULOS AS lin ON lin.id = itm.custitem_bex_tipo_articulo "+ // Líneas
                "     LEFT JOIN customlist_clasificacion_art_ubicacion AS clu ON clu.id = inl.invtclassification "+   // Clasificación del inventario
                "     LEFT JOIN itemvendor AS itv ON itv.item = itm.id and  itv.preferredvendor = 'T'  "+   //  
                "     LEFT JOIN vendor AS ven ON ven.id = itv.vendor "+                         // Proveedores
                "     LEFT JOIN CUSTOMRECORD_BEX_SUBLINEA AS sbl ON sbl.id = itm.custitem_bex_sublinea "+         // Sublíneas
                "   LEFT JOIN CUSTOMLIST225  AS cli5 ON cli5.id = itm.custitem5  LEFT JOIN CUSTOMLIST224 AS cli4 ON cli4.id = itm.custitem4   LEFT JOIN CUSTOMLIST620 AS sgm ON sgm.id = itm.custitem8 LEFT JOIN CUSTOMRECORD673 SubF on  itm.custitem12=SubF.id LEFT JOIN CUSTOMRECORD670 Departamento on  itm.custitem9=Departamento.id LEFT JOIN CUSTOMRECORD672 Familia on  itm.custitem11=Familia.id LEFT JOIN CUSTOMRECORD671 NCP on  itm.custitem10=NCP.id"+ /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 05/07/2023-----------------------*/
                                // Comprador (Segmento)
                "   WHERE 1 = 1 "+
                "   AND itm.itemtype = 'InvtPart' "+
                "   AND itm.isinactive = 'F' "+
                "   AND loc.id IN(" + ubicaciones + ") "+
              
                " AND tra.trandate >= TO_DATE('"+ f_Inicio +"', '/DD/MM/YYYY') "+
                "   AND tra.trandate <= TO_DATE('"+ f_Final +"', '/DD/MM/YYYY') "+
            
            
                (linea_principal.length   > 0 ? "AND itm.custitem_bex_tipo_articulo = '"+linea_principal+"' " : "")+
        
                /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 05/07/2023-----------------------*/
                (ncp    > 0 ? "AND itm.custitem10           = '"+ncp+"' "   : "")+
                
                                  (validador  ==1 ? "AND sbl.id IN("+sub_linea+") "   : "")+
              
                  /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 05/07/2023-----------------------*/
              
                " ) AS N1 "+
                " GROUP BY  "+
                  "   N1.id, "+
                  "   N1.proveedor, "+
                  "   N1.linea, "+
                  "   N1.clasificador, "+
                  "   N1.sublinea, "+
                  "   N1.comprador, "+
                  "   N1.description, "+
                  "   N1.displayname, "+
                  "   N1.location, "+
                  "   N1.stockUbicacionOptimo, "+
                  "   N1.stockUbicacionPPedido, "+
    
                  "   N1.custrecord_toplow , "+
                
                  "   N1.am_99, N1.am_11,N1.am_10,N1.am_12,"+
                  "   N1.stockDisponible, "+
                  "   N1.custitem4 , "+
                    "   N1.custitem5, "+
                    "   N1.quantityonorder, "+
                    "   N1.custitem15"+
                  
                " ) AS N2  "+wh;
  
  
        // var suiteQL = "SELECT * FROM inventorycostrevaluation WHERE ROWNUM <= 1002";
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
      //61952userId
      var dias2222=dias1432+1
  
  
          innerHtml+= '<br/><br/><input type="text" id="valor_Dias" name="Dias" class="form-control" value="'+Math.round(valor_dedia)+' Dias laborales de diferencia entre las fechas" readonly=""/>';
  
  
      innerHtml+= '<table style="table-layout: fixed; width: 300%; border-spacing: 6px;">';
      innerHtml+= '<tr>';
      innerHtml+= '<td>';
      innerHtml+= '<div id="resultsDiv" style="display:none">';
      innerHtml+= ' <div class="table-responsive">';
      innerHtml+= '   <table class="display nowrap table table-sm table-bordered table-hover table-responsive-sm" id="resultsTable">';
      if ( records.length > 0 ) {
  
        var columnNames = Object.keys( records[0] );
        innerHtml+= '     <thead class="thead-light">';
        innerHtml+= '       <tr>';
        for ( i = 1; i < columnNames.length; i++ ) {
          if (columnNames[i].indexOf("meses_c_inventario")  !== -1) continue;
          if (columnNames[i].indexOf("venta_1_mes_atras")   !== -1) continue;
          if (columnNames[i].indexOf("venta_1_mes_futuro")  !== -1) continue;
          if (columnNames[i].indexOf("fecha_inicio_mes_f")  !== -1) continue;
          if (columnNames[i].indexOf("fecha_final_mes_f")   !== -1) continue;
      
                    if (columnNames[i].indexOf("punto_de_pedido") !== -1)continue;
                        if (columnNames[i].indexOf("stock_optimo") !== -1)continue;
                        if (columnNames[i].indexOf("sugerido_compra") !== -1)continue;
                
          if (columnNames[i].indexOf("dif_dias_fechas")   !== -1) continue;
            if (columnNames[i].indexOf("custitem4")   !== -1) continue;
              if (columnNames[i].indexOf("tipoCompra")    !== -1) continue;
  if (columnNames[i].indexOf("quantitybackordered")   !== -1) continue;
  if (columnNames[i].indexOf("custitem15")   !== -1) continue;
  if (columnNames[i].indexOf("idart")   !== -1) continue;
  if (columnNames[i].indexOf("pendiente_recibir")   !== -1) continue;
  
  
          innerHtml+= '     <th>'+columnNames[i]+'</th>';
        }
      
  
          innerHtml+= '         <th>días exist</th>';
  
  
  
    
            innerHtml+= '         <th>clasif</th>';
              innerHtml+= '         <th>backorder</th>';
        innerHtml+= '         <th>comprar</th>';
      innerHtml+= '         <th>id_articulo</th>';
    innerHtml+= '         <th>Solicitar Pedido</th>';
  innerHtml+= '         <th class="solped">Solicitar Pedido2</th>';
  
          
    
  
        innerHtml+= '       </tr>';
        innerHtml+= '     </thead>';
        innerHtml+= '     <tbody>';
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
          var pendiente_recibir = 0;
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
                var cant_vta_pz=0;
            var Vposible=0;
          var bComprar;
          var fecha_inicio_mes_f;
          var fecha_final_mes_f;
        var variable_a=0;
              var variable_text_aa="";
  var variable_b=0;
  var variable_c=0;
  var quantityonorder=0;
  var quantityonorder2=0;
          var comprador;
          var es_numero     = false;
            var custitem4       = "";
  var tipoCompra  = 0;  var comp =0;
  
  var variable_c_final=0;
  var variable_c_final_2=0;
   var dias_inventario =0;
   var idart =0;
    var pendiente_recibir =0;
  
          innerHtml+= '     <tr>';
          var record = records[r];
          for ( c = 1; c < columnNames.length; c++ ) {
            // Nombre de la columna
            var column = columnNames[c];
            var value = record[column];
   
              if (column.indexOf("punto_de_pedido") !== -1)continue;
                        if (column.indexOf("stock_optimo") !== -1)continue;
                        if (column.indexOf("sugerido_compra") !== -1)continue;
  if (column.indexOf("quantitybackordered") !== -1)continue;
         if (column.indexOf("pendiente_recibir") !== -1)
              pendiente_recibir += parseInt(value);
   
  if (column.indexOf("pendiente_recibir") !== -1)continue;
  
            if (column.indexOf("pendiente_recibir") !== -1)
              meses_inv += parseInt(value);
            else if (column.indexOf("venta_1_mes_atras") !== -1)
              venta_1_mes_atras += parseFloat(value);
        
          else if (column.indexOf("custitem4") !== -1) 
    
            custitem4 = value;
          if (column.indexOf("custitem4") !== -1)continue;
            if (column.indexOf("custitem15") !== -1)continue;
        
          else if (column.indexOf("idart") !== -1)
                    idart += parseInt(value);
                  if (column.indexOf("idart") !== -1)continue;
  
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
  
  
            
                else if (column.indexOf("quantityonorder") !== -1)
            innerHtml += '    <td align="'+ (es_numero ? "right" : "right") +'" class="oculta">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
              else if (column.indexOf("tot_vtas") !== -1)
            innerHtml += '    <td align="'+ (es_numero ? "right" : "right") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
          else if (column.indexOf("Stock") !== -1)
            innerHtml += '    <td align="'+ (es_numero ? "right" : "right") +'" class="hide">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
                  else if (column.indexOf("stock") !== -1)
            innerHtml += '    <td align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value) : parseInt(value)) + '</td>';
              else if (column.indexOf("cant_vta_pz") !== -1)
            innerHtml += '    <td align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value) : parseInt(value)) + '</td>';
             else if (column.indexOf("vtas_x_dia") !== -1)
            innerHtml += '    <td align="'+ (es_numero ? "right" : "right") +'" >' + (es_numero ? parseInt(value) : parseInt(value)) + '</td>';
            else{
              value = value === null ? '&nbsp;' : value.toString();
              if ( value.length > 300 ) {
                value = value.substring( 0, 297 ) + '...';
              }
              es_numero = c >= 8 && !isNaN(value) ? true : false;
              innerHtml += '    <td align="'+ (es_numero ? "right" : "right") +'">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
            }
            if (column.indexOf("cant_vta_pz") !== -1)
  
              cant_vta_pz = parseFloat(value);
  
            if (column.indexOf("stock") !== -1)
              stock = parseFloat(value);
            if (column.indexOf("venta_de_dia") !== -1)
              venta_de_dia = parseFloat(value);
            if (column.indexOf("pendiente_recibir") !== -1)
              pendiente_recibir = parseFloat(value);
            if (column.indexOf("sugerido_compra") !== -1)
              sugerido_compra = parseFloat(value);
            if (column.indexOf("quantityonorder") !== -1)
              quantityonorder = parseFloat(value)
  
            if (column.indexOf("dias_inventario") !== -1)
              dias_inventario = parseFloat(value)
  
        
          }
  disponible=stock
          cobertura     = stock ;
  
          contador_domingos = contarDomingos(fecha_inicio_mes_f, fecha_final_mes_f);
          dias_x_transcurrir  = dif_dias_fechas - contador_domingos;
      
          proyectado      = Math.max(venta_prom_mensual, sugerido_compra, venta_1_mes_atras, venta_1_mes_futuro);
          proyectado      = comprador == 'Comprador 1' || comprador == 'Comprador 2' ? venta_prom_mensual : proyectado;
          comprar       = proyectado - disponible - pendiente_recibir;
          bComprar      = comprar > 0 ? "SI" : "";
  
         venta_diaria=cant_vta_pz/valor_dedia
         Venta_con_stock_actual=0
          Venta_con_stock_actual=stock/dias_inventario
  
          if(cant_vta_pz >0  )
            {Venta_con_stock_actual=stock/dias_inventario}
            else{  Venta_con_stock_actual=0}
          
                if(comprar   >0  ){
                  comp=comprar
                }else{  comp=0}
  
  
  if(custitem4=="1"){ // valor 1 = A
    variable_a=60
    variable_text_aa="A"
  }
  
  if(custitem4=="2"){// valor 2= b
    variable_a=45
    variable_text_aa="B"
  }
  if(custitem4=="3"){// valor 3 = c
    variable_a=30
    variable_text_aa="C"
  }
  
  variable_b=(dias_inventario.toFixed(2)*variable_a)
  
  
  i
  if(variable_b<=0){
  
    variable_c=0
  } else{variable_c=variable_b}
   if (isNaN(quantityonorder)) { quantityonorder2=0}else{quantityonorder2=quantityonorder}
  
      variable_c_final=variable_c-quantityonorder2
  
  if (isNaN(variable_c_final)) { variable_c_final_2=0}else{variable_c_final_2=quantityonorder}
  if (Venta_con_stock_actual>150){Venta_con_stock_actual='mas de 150'}else{Venta_con_stock_actual=Venta_con_stock_actual.toFixed(0)}
  
              innerHtml += '        <td align="right">'+Venta_con_stock_actual     +' Dias</td>';
  
  
        
  
          innerHtml += '        <td align="right">'+variable_text_aa     +' </td>';
          innerHtml += '        <td align="right">'+pendiente_recibir+'</td>';
          
          innerHtml += '        <td align="right" id="cant_'+r+'">'+parseInt(variable_b-(stock+pendiente_recibir)) +' </td>';
          innerHtml += '        <td align="right" id="id_art'+r+'">'+idart +' </td>';
          
  
               innerHtml += '        <td align="right">  <input type="checkbox" id="Check_Pedido_'+r+'" name="Check_Pedido" class="Check_Pedido"></td>';
  
               innerHtml += '        <td align="right"  id="Check_Pedido_dd_'+r+'" class="solped" >  </td>';
                
               
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
      htmlField.defaultValue = generadorHtml(innerHtml, records.length,userId);
  
    
      context.response.writePage( form );
  
    }
      function asdsa() {    log.audit({title:"asdas", details:runtime.getCurrentUser().name});}
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
      str+= "(TRUNC(LAST_DAY(TO_DATE('"+ fechaInicio + anio_ini +"', 'MM/DD/YYYY'))) - TO_DATE('"+ mes+"/"+dia+"/"+anio+"', 'MM/DD/YYYY') + 1) AS dif_dias_fechas, ";
      str+= "TO_DATE('"+ mes+"/"+dia+"/"+anio+"', 'MM/DD/YYYY') AS fecha_inicio_mes_f, ";
      str+= "TRUNC(LAST_DAY(TO_DATE('"+ fechaInicio + anio +"', 'MM/DD/YYYY'))) AS fecha_final_mes_f, ";
      // log.debug({title:"query", details:str});
  
      /** Total ventas */
      var venta_total ="Total_venta"
      str+= "COALESCE((SUM( "+
      " (CASE WHEN "+
      "   1 = 1 "+
      "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
      "   AND N1.trandate >= TO_DATE('"+ mes_ini +"/"+ dia_ini +"/"+ anio_ini +"', 'MM/DD/YYYY') "+
      "   AND N1.trandate <= TO_DATE('"+ mes +"/"+ dia +"/"+  anio +"', 'MM/DD/YYYY')  "+
      " THEN N1.netamount * -1 "+
      " ELSE 0 "+
      " END))-    (SUM( "+
      " (CASE WHEN "+
      "   1 = 1 "+
      "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
      "   AND N1.trandate >= TO_DATE('"+ mes_ini +"/"+ dia_ini +"/"+ anio_ini +"', 'MM/DD/YYYY') "+
      "   AND N1.trandate <= TO_DATE('"+ mes +"/"+ dia +"/"+  anio +"', 'MM/DD/YYYY') AND N1. terms not  in(4,20 )  "+
      " THEN N1.netamount * -1 "+
      " ELSE 0 "+
      " END)) + "+
    
  "SUM( "+
      " (CASE WHEN "+
      "   1 = 1 "+
      "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
      "   AND N1.trandate >= TO_DATE('"+ mes_ini +"/"+ dia_ini +"/"+ anio_ini +"', 'MM/DD/YYYY') "+
      "   AND N1.trandate <= TO_DATE('"+ mes +"/"+ dia +"/"+  anio +"', 'MM/DD/YYYY') AND N1. terms not  in(4,20 )  "+
      " THEN N1.netamount * 0.95 "+
      " ELSE 0 "+
      " END))) ),0) AS "+
      "tot_vtas , "+
      " ";
  
  
      /** Meses con inventario ***/
  
  
  
  
      /** Total ventas Piezas */
    
  
            
  
  
      
  
      /** Stock */
    
      
  
        
  
      
      return str;
    }
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
      if(year < 1000 || year > 3000 || month == 0 || month > 12)
      return false;
  
      var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  
      // Años bisiestos
      if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;
  
      return day > 0 && day <= monthLength[month - 1];
    }
  
    ///aqui
      
  //61952userId
    function generadorHtml(table, records,userId){
        
  
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
  
        html += '</style>'
        html += table;
  
          html += '<script>';
          //////////
    
        
          
          ///////////
          html += ' $("#submitter").click(function(){$("#myModal").modal("show")});';
       
    html += ' $("#resultsTable").DataTable({';
    html += records > 0 ? '   "order": [[3, "desc"]],' : '';
    html += '   "pageLength": 300,';
    html += '   "initComplete": function(){';
    html += '     $("#resultsDiv").show(); ';
    html += '   },';
    html += '   "language": {"url":"https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"},';
    html += '   "buttons": [';
    html += '       { extend: "excel",';
    html += '         exportOptions: { columns: [0, 1, 2,3, 4,6,8,10,11,12,13,14 ] }'; // Excluye la columna 3 (índice 2)
    html += '       }';
    html += '   ],';
    html += '   "dom":"lBpftip"';
    html += ' });';
    
      html += ' $("#gen_pedido").click(function(){ alert("Se esta generando el Pedido");   setTimeout(function() {alert("el Pedido de compra Generado es : C784853");  }, 10000);});'
            html += 'var precios = document.querySelectorAll(".precio");';
    
     html += ' precios.forEach(function(precio) {';
       html += ' var valor = parseFloat(precio.textContent);';
      html += '  precio.textContent = valor.toLocaleString("en-US", { style: "currency", currency: "USD" });';
      html += '});';
       html += '  var tabla = document.getElementById("resultsTable");'
    html += ' var columna41 = 7; '

    html += ' var idus='+userId+'; console.log(idus); if(idus==61952 || idus==63831676 ){ '
      //61952userId
    html += ' for (var i = 0; i < tabla.rows.length; i++) {'
    html += '   tabla.rows[i].cells[5].style.display = "none"; '
    html += '   tabla.rows[i].cells[7].style.display = "none"; '
   
    
    html += '   tabla.rows[i].cells[9].style.display = "none"; '
    html += '   tabla.rows[i].cells[15].style.display = "none"; '
    html += '   tabla.rows[i].cells[17].style.display = "none"; '
     html += '}} else{'
     html += ' for (var i = 0; i < tabla.rows.length; i++) {'
      html += '   tabla.rows[i].cells[5].style.display = "none"; '
      html += '   tabla.rows[i].cells[7].style.display = "none"; '
      html += '   tabla.rows[i].cells[10].style.display = "none"; '
      
      html += '   tabla.rows[i].cells[9].style.display = "none"; '
      html += '   tabla.rows[i].cells[15].style.display = "none"; '
      html += '   tabla.rows[i].cells[17].style.display = "none"; '
      html += ' }}'
    
     html +=" $('.Check_Pedido').change(function () {"
         html +="var idDelCheckbox = $(this).attr('id');"
    
    
        html +="var textoCompleto = idDelCheckbox;"
    
        // Utiliza split para separar el texto por el guion bajo "_"
        html +="var partes = textoCompleto.split('_');"
    
        // Imprime cada parte en la consola
    
           html +=" var chid='Check_Pedido_dd_'+partes[2];"
            // Verifica si el checkbox está marcado
            html +=" if ($(this).is(':checked')) {"
                // Obtiene el ID del checkbox seleccionado
           
               html +="var ct= $('#cant_'+partes[2]).html(); console.log('ct '+ct);"   
               html +="var id_art= $('#id_art'+partes[2]).html(); ;" 
              html +=" $('#Check_Pedido_dd_'+partes[2]).html('TRLDETX,'+ct+','+id_art+'//');"  
    html +=" $('#Check_Pedido_dd_'+partes[2]).text('TRLDETX //'+ct+'//'+id_art+'//');"  
    
                // Imprime el ID en la consola
          
             html +="} else{   $('#Check_Pedido_dd_'+partes[2]).text('');  }"
         html +="});"
    
    
         html+="var columna_9 = '';"
         html+="$('#resultsTable tbody').find('tr').each(function (i, el) {"
         html+=" columna_9= $(this).find('td').eq(9).text();"
    
         html+=" if(columna_9=='T'){$(this).find('td').eq(12).css('background-color', '#FC9696');}"
    
       html+="  console.log(columna_9);"
         html+="}); "
    
         html+=" var filas = document.querySelectorAll('#resultsTable tbody tr');"

         // Índice de la columna que deseas ocultar
         html+=" var indiceColumnaOcultar = 7;"
         
         // Iterar sobre todas las filas y ocultar la celda correspondiente a la columna especificada
         html+=" filas.forEach(function(fila) {"
            html+="    fila.cells[indiceColumnaOcultar].style.display = 'none';"
            html+=" });"
  
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
  