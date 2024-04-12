/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 *
 */

define(['N/query', 'N/log', 'N/ui/serverWidget', 'N/runtime'], function(query, log, serverWidget, runtime){

  function onRequest(context){

        var delimiter     = /\u0005/;
    
 

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
      title: 'Venta Global Ferrepacifico',
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

    




/*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 04/07/2023-----------------------*/







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





      ventadias=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) AS "+
          " cantidad_venta_piezas, "+
          " ";

   ventadias_cantamar=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) AS "+
          " cantidad_venta_piezas_cantamar, "+
          " ";


   ventadias_la_Huerta=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) AS "+
          " cantidad_venta_piezas_la_Huerta, "+
          " ";
            ventadias_Villa_Purificacion=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) AS "+
          " cantidad_venta_piezas_Villa_Purificacion, "+
          " ";

    ventadias_Fondeport=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) AS "+
          " cantidad_venta_piezas_Fondeport, "+
          " ";
    
      ventadias_Monterrey=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) AS "+
          " cantidad_venta_Monterrey, "+
          " ";
    


  
      ventadias_Tlaquepaque=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) AS "+
          " cantidad_venta_Tlaquepaque, "+
          " ";
        

      ventadias_Melaque=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) AS "+
          " cantidad_venta_Melaque, "+
          " ";

      ventadias_Autlan=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) AS "+
          " cantidad_Autlan, "+
          " ";


     var dias1432 =Dias_diferencia(f_Inicio, f_Final)-contarDomingos(f_Inicio, f_Final);
            var dias143222 =contarDomingos(f_Inicio, f_Final);
      var ff111=Dias_diferencia(f_Inicio, f_Final);
    innerHtml = "";

    var dias2222=dias1432+1
      ventadias_Dias=  "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 0 "+
          " END) / "+dias2222+" AS "+
          " Dias_de_inventario ,"+
  " ";
//////////////
  ventadias_Dias_Real=  "SUM (N1.stockDisponible)   /(SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 1 "+
          " END) / "+dias2222+" )AS "+
          " Dias_de_inventario_Real "+

  " ";

          ///////////




/////////

          " ";
           ventadias_Dias_c=  "SUM (N1.stockDisponible)   /(SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 1 "+
          " END) / "+dias2222+" )AS "+
          " Dias_de_inventario_cantamar "+
          " ";

         ventadias_Dias_h=  "SUM (N1.stockDisponible)   /(SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 1 "+
          " END) / "+dias2222+" )AS "+
          " Dias_de_inventario_La_huerta "+
          " ";
ventadias_Dias_p=  "SUM (N1.stockDisponible)   /(SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 1 "+
          " END) / "+dias2222+" )AS "+
          " Dias_de_inventario_Villa_Purificacion "+
          " ";
          ventadias_Dias_f=  "SUM (N1.stockDisponible)   /(SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 1 "+
          " END) / "+dias2222+" )AS "+
          " Dias_de_inventario_Fondeport "+
          " ";
             ventadias_Dias_m=  "SUM (N1.stockDisponible)   /(SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 1 "+
          " END) / "+dias2222+" )AS "+
          " Dias_de_inventario_Monterrey "+
          " ";
             ventadias_Dias_t=  "SUM (N1.stockDisponible)   /(SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 1 "+
          " END) / "+dias2222+" )AS "+
          " Dias_de_inventario_Tlaquepaque "+
          " ";
           ventadias_Dias_mm=  "SUM (N1.stockDisponible)   /(SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 1 "+
          " END) / "+dias2222+" )AS "+
          " Dias_de_inventario_Melaque "+
          " ";
           ventadias_Dias_a=  "SUM (N1.stockDisponible)   /(SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') "+
          " THEN N1.stock * -1 "+
          " ELSE 1 "+
          " END) / "+dias2222+" )AS "+
          " Dias_de_inventario_Autlan "+
          " ";
/*
PurchOrd
/

sql_Tlaquepaque
sql_Melaque
sql_Autlan*/

      /** SQL principal */
    var sqlPrincipal= "SELECT customrecord678.name Sucursal,customrecord678.  custrecord213 Objetivo,(customrecord678.  custrecord213/26 )*"+dias2222+"  Objetivo_al_dia,N2.*,(N2.total_venta/((customrecord678.  custrecord213/26 )*"+dias2222+"))*100  Porcentaje , customrecord678.  custrecord214 Utilidad,(customrecord678.  custrecord214/26 )*"+dias2222+"  Objetivo_al_dia_utilidad ,((N2.total_venta-N2.total_compra)/N2.total_venta)*100 utilidad_Porcentaje FROM ( "+
              " SELECT  "+
              
          
                  " "+ columnasXMeses(anio,mes,dia,mes_ini,dia_ini,anio,log) +

       
        
/////////////



            //////////
          


              " N1.idLocation,  N1.location       AS locationxz "+

     
      
          
              " FROM ( "+
              "   SELECT "+
              "     itm.id            AS id, "+
          
              

              "     itm.description       AS description, "+
                
                    
              "     loc.name          AS location, "+
              "     loc.id            AS idLocation, "+
              "     trl.quantity        AS stock, "+
              "     itm.displayname       AS displayname, "+
              "     sbl.name          AS sublinea, "+
              "     lin.name          AS linea, "+
           
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
         
                
            "   FROM Item AS itm "+
              "     INNER JOIN TransactionLine AS trl ON trl.Item = itm.ID "+
              "     INNER JOIN Transaction AS tra ON tra.id = trl.Transaction "+
              "     INNER JOIN location AS loc ON loc.id = trl.location "+
              "     INNER JOIN inventoryitemlocations AS inl ON inl.Item = itm.ID AND inl.location = loc.id "+      // Stock por ubicaciones
              "     INNER JOIN CUSTOMRECORD_BEX_LINEAS_ARTICULOS AS lin ON lin.id = itm.custitem_bex_tipo_articulo "+ // Líneas
              "     LEFT JOIN customlist_clasificacion_art_ubicacion AS clu ON clu.id = inl.invtclassification "+   // Clasificación del inventario
              "     LEFT JOIN itemvendor AS itv ON itv.item = itm.id AND itv.preferredvendor = 'T' "+         // Relación artículo - proveedor preferido
              "     LEFT JOIN vendor AS ven ON ven.id = itv.vendor "+                         // Proveedores
              "     LEFT JOIN CUSTOMRECORD_BEX_SUBLINEA AS sbl ON sbl.id = itm.custitem_bex_sublinea "+         // Sublíneas

               // Comprador (Segmento)
              "   WHERE 1 = 1 "+
              "   AND itm.itemtype = 'InvtPart' "+
              "   AND itm.isinactive = 'F' "+
           "   AND loc.id IN(6,2,4,5,18,1,3,17) "+
               
            
              " AND tra.trandate >= TO_DATE('"+ f_Inicio +"', '/DD/MM/YYYY') "+
              "   AND tra.trandate <= TO_DATE('"+ f_Final +"', '/DD/MM/YYYY') "+
          
     
            
                /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 05/07/2023-----------------------*/
            
              " ) AS N1 "+
              " GROUP BY  "+
              "   N1.idLocation, "+
          "   N1.location "+
         
       
    
           
           
              
          
              " ) AS N2   join   customrecord678 on    N2.idLocation= customrecord678.custrecord212  ";

       



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
  var dias1432 =Dias_diferencia(f_Inicio, f_Final)-contarDomingos(f_Inicio, f_Final);
            var dias143222 =contarDomingos(f_Inicio, f_Final);
      var ff111=Dias_diferencia(f_Inicio, f_Final);
    innerHtml = "";

    var dias2222=dias1432+1
  
        innerHtml+= '<br/><br/><input type="text" id="valor_Dias" name="Dias" class="form-control" value="'+dias2222+' Dias laborales de diferencia entre las fechas" readonly=""/>';

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
        if (columnNames[i].indexOf("venta_1_mes_atras")  !== -1) continue;
 if (columnNames[i].indexOf("venta_1_mes_futuro")  !== -1) continue;

 if (columnNames[i].indexOf("dif_dias_fechas")  !== -1) continue;
 if (columnNames[i].indexOf("fecha_inicio_mes_f")  !== -1) continue;
  if (columnNames[i].indexOf("fecha_final_mes_f")  !== -1) continue;
  if (columnNames[i].indexOf("idlocation")  !== -1) continue;
   if (columnNames[i].indexOf("locationxz")  !== -1) continue; 
   if (columnNames[i].indexOf("total_compra")  !== -1) continue;
          innerHtml+= '     <th>'+columnNames[i]+'</th>';
     
      }
    



      innerHtml+= '       </tr>';
      innerHtml+= '     </thead>';
      innerHtml+= '     <tbody>';
      // Add the records to the sublist...
      for ( r = 0; r < records.length; r++ ) {
        
        
        innerHtml+= '     <tr>';
        var record = records[r];
        for ( c = 1; c < columnNames.length; c++ ) {
          // Nombre de la columna
          var column = columnNames[c];
          var value = record[column];


            if (column.indexOf("venta_1_mes_atras") !== -1)continue;

 if (column.indexOf("venta_1_mes_futuro") !== -1)continue;

    
 if (column.indexOf("dif_dias_fechas") !== -1)continue;
  if (column.indexOf("fecha_inicio_mes_f") !== -1)continue;
   if (column.indexOf("fecha_final_mes_f") !== -1)continue;
            if (column.indexOf("idlocation") !== -1)continue;
                  if (column.indexOf("locationxz") !== -1)continue;
                         if (column.indexOf("total_compra") !== -1)continue;



             if (column.indexOf("objetivo") !== -1)
          innerHtml += '    <td align="'+ (es_numero ? "right" : "left") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';

             else if (column.indexOf("total_venta") !== -1)
          innerHtml += '    <td align="'+ (es_numero ? "right" : "left") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
           else if (column.indexOf("utilidad") !== -1)
          innerHtml += '    <td align="'+ (es_numero ? "right" : "left") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
               else if (column.indexOf("utilidad_porcentaje") !== -1)
          innerHtml += '    <td align="'+ (es_numero ? "right" : "left") +'" class="precio">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
        
else{
            value = value === null ? '&nbsp;' : value.toString();
            if ( value.length > 300 ) {
              value = value.substring( 0, 297 ) + '...';
            }
            es_numero = c >= 8 && !isNaN(value) ? true : false;
            innerHtml += '    <td align="'+ (es_numero ? "right" : "left") +'">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
          }}
   
        


      
    
                                                             
            
    


      

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

  function columnasXMeses(anio,mes,dia,mes_ini,dia_ini,anio,log){
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
    str+= "(TRUNC(LAST_DAY(TO_DATE('"+ fechaInicio + anio +"', 'MM/DD/YYYY'))) - TO_DATE('"+ mes+"/"+dia+"/"+anio+"', 'MM/DD/YYYY') + 1) AS dif_dias_fechas, ";
    str+= "TO_DATE('"+ mes+"/"+dia+"/"+anio+"', 'MM/DD/YYYY') AS fecha_inicio_mes_f, ";
    str+= "TRUNC(LAST_DAY(TO_DATE('"+ fechaInicio + anio +"', 'MM/DD/YYYY'))) AS fecha_final_mes_f, ";
    // log.debug({title:"query", details:str});

    /** Total ventas */
    var venta_total ="Total_venta"
  
      str+= "SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
          "   AND N1.trandate >= TO_DATE('"+ mes_ini +"/"+ dia_ini +"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+ mes +"/"+ dia +"/"+  anio +"', 'MM/DD/YYYY') "+
          " THEN N1.netamount * -1 "+
          " ELSE 0 "+
          " END) AS "+
          "Total_venta , "+
          " ";
          str+= "(SUM( "+
          " CASE WHEN "+
          "   1 = 1 "+
          "   AND N1.type IN( 'PurchOrd' ) "+
          "   AND N1.trandate >= TO_DATE('"+ mes_ini +"/"+ dia_ini +"/"+ anio +"', 'MM/DD/YYYY') "+
          "   AND N1.trandate <= TO_DATE('"+ mes +"/"+ dia +"/"+  anio +"', 'MM/DD/YYYY') "+
          " THEN N1.netamount * -1 "+
          " ELSE 0 "+
          " END))*-1 AS "+
          "total_compra , "+
          " ";
    

    /** Meses con inventario ***/




    /** Total ventas Piezas */
  

          


    

    /** Stock */
  
    

      

    
    return str;
  }
  ///////////

  function columnasXMeses_cantamar(anio,mes,dia,mes_ini,dia_ini,anio,log){
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
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
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
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
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
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
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
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
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
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
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
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
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
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
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
          "   AND N1.type IN( 'SalesOrd', 'CustCred' ) "+
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
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
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
    html += ' .rojo{';
      html += '   background-color: #FE9797;';
      html += ' }';
      html += ' .verde{';
      html += '   background-color: #A6CFAF;';
      html += ' }';
      html += ' .amarillo{';
      html += '   background-color: #F7FA8F;';
      html += ' }';
      html += '</style>'
      html += table;
      html += '<script>';
      //////////

    

      ///////////
      html += ' $("#submitter").click(function(){$("#myModal").modal("show")});';
      html += ' $("#resultsTable").DataTable({';
      html += records > 0 ? '   "order": [[2, "desc"]],' : '';
      html += '   "initComplete": function(){';
      html += '     $("#resultsDiv").show(); ';
      html += '   },';
      html += '   "language": {"url":"https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"},';
      html += '   "buttons": ["excel"],';
      html += '   "dom":"lBpftip"';
      html += ' }';
      html += ');';


 html += 'var precios = document.querySelectorAll(".precio");';
 html += ' precios.forEach(function(precio) {';
   html += ' var  valor =0;var valor = parseFloat(precio.textContent); console.log("aqui el valor "+ valor);';
   html += ' if (isNaN(valor)) {precio.textContent ="$0";}';
  html += '  else {precio.textContent = valor.toLocaleString("en-US", { style: "currency", currency: "USD" });}';
  //cantidad_venta_piezas c_piezas //cantidad_venta_piezas c_piezas
  html += '});';
 html += 'var c_piezas = document.querySelectorAll(".c_piezas");';

 html += ' c_piezas.forEach(function(c_piezas) {';
   html += ' var  valor =0;var valor = parseFloat(c_piezas.textContent); console.log("aqui el valor "+ valor);';
   html += ' if (isNaN(valor)) {c_piezas.textContent =0;}';
  html += '  else {c_piezas.textContent = valor;}';
  //cantidad_venta_piezas c_piezas
  html += '});';
 html += '  var tabla = document.getElementById("resultsTable");'

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

var diferencia=dias/(1000*60*60*24);

  return diferencia;
}
  return {
    onRequest: onRequest
  }
});
