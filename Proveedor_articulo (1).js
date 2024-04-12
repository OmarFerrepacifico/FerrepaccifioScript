/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/format/i18n', 'N/log', 'N/query', 'N/runtime', 'N/ui/serverWidget'],
    /**
 * @param{i18n} i18n
 * @param{log} log
 * @param{query} query
 * @param{runtime} runtime
 * @param{serverWidget} serverWidget
 */
    (i18n, log, query, runtime, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            var numFormatter = i18n.getNumberFormatter({
				groupSeparator: ",", 
				decimalSeparator: ".", 
				precision: 2, 
				negativeNumberFormat: i18n.NegativeNumberFormat.MINUS
			});
			var intFormatter = i18n.getNumberFormatter({
				groupSeparator: ",", 
				decimalSeparator: ".", 
				precision: 0, 
				negativeNumberFormat: i18n.NegativeNumberFormat.MINUS
			});  
			var delimiter = /\u0005/;
            var f_Inicio = scriptContext.request.method == 'POST' ? scriptContext.request.parameters.custpage_field_inicio : fechaHoy();
			var f_Final = scriptContext.request.method == 'POST' ? scriptContext.request.parameters.custpage_field_final : fechaHoy();
			var sucursales	= scriptContext.request.method == 'POST' ? scriptContext.request.parameters.custpage_sucursal.split(delimiter) : '0,1,2,3,4,5,6,23';
			var proveedors	= scriptContext.request.method == 'POST' ? scriptContext.request.parameters.custpage_proveedor.split(delimiter) : '1,2,3,4,5,6,7,8,9,10,11,12';
		
			var cantidad=0;
            var noRowInicio = 0;
			var noRowFinal = 9999999;
			var records = new Array();
			var recordss = new Array();
			var form = serverWidget.createForm({
				title: 'Venta por proveedor detallado producto',
				hideNavBar: false
			});
			var fieldgroup = form.addFieldGroup({
				id: 'grupofiltros',
				label: 'Filtros'
			});
			var fieldgroup = form.addFieldGroup({
				id: 'grupotabla',
				label: 'Resultados'
			});
			form.addSubmitButton({ label: 'Generar Reporte' });
			var Desde = form.addField({
				id: 'custpage_field_inicio',
				type: serverWidget.FieldType.DATE,
				label: 'Desde',
				container: 'grupofiltros'
			}).setHelpText({ help: "Se obtendrá el cálculo de todo el año que se seleccione en el campo 'Hasta', hasta el mes seleccionado" });
			Desde.isMandatory = true;
			Desde.defaultValue = f_Inicio;

			var fechaFinal = form.addField({
				id: 'custpage_field_final',
				type: serverWidget.FieldType.DATE,
				label: 'Hasta',
				container: 'grupofiltros'
			}).setHelpText({ help: "Se obtendrá el cálculo de todo el año que se seleccione en el campo 'Hasta', hasta el mes seleccionado" });
			fechaFinal.isMandatory = true;
			fechaFinal.defaultValue = f_Final;
            var sucursal = form.addField({
				id: "custpage_sucursal",
				type: serverWidget.FieldType.SELECT,
				label: "Sucursal",
				container: 'grupofiltros'
			}).setHelpText({ help: "Seleccionar al menos un tipo de comisión" });
			sucursal.defaultValue = sucursales;
			sucursal.addSelectOption({
				value : '0',
				text : 'Todas'
			});
			sucursal.addSelectOption({
				value : '1',
				text : 'Tlaquepaque'
			});
			sucursal.addSelectOption({
				value : '2',
				text : 'La Huerta'
			});
			sucursal.addSelectOption({
				value : '3',
				text : 'Melaque'
			});
			sucursal.addSelectOption({
				value : '4',
				text : 'Villa Purificación'
			});
            sucursal.addSelectOption({
				value : '5',
				text : 'Fondeport'
			});
            sucursal.addSelectOption({
				value : '6',
				text : 'Cantamar'
			});
            sucursal.addSelectOption({
				value : '23',
				text : 'Mayoreo'
			});
            var proveedor = form.addField({
				id: "custpage_proveedor",
				type: serverWidget.FieldType.SELECT,
				label: "Proveedor",
				container: 'grupofiltros'
			}).setHelpText({ help: "Seleccionar al menos un tipo de comisión" });
			proveedor.defaultValue = proveedors;
            proveedor.addSelectOption({
                value : -1,
                text : "Todos"
            });
            proveedor.addSelectOption({
                value : 0,
                text : "Sin Proveedor"
            });
			var sqlPrincipal ="SELECT id,name FROM CUSTOMRECORD671 ORDER BY name ASC"
            var noRowInicios = 0;
			var noRowFinals = 500;
            do {
                var suiteQL = "SELECT * FROM ( SELECT ROWNUM AS ROWNUMBER, * FROM (" + sqlPrincipal + " ) ) WHERE (ROWNUMBER BETWEEN " + noRowInicios + " AND " + noRowFinals + ")";
                var resultIterator = query.runSuiteQL({ query: suiteQL }).asMappedResults();
                var moreRecords = resultIterator.length < 499 ? false : true;
                noRowInicios = noRowInicios + 501;
            } while (moreRecords);
            for (let index = 0; index < resultIterator.length; index++) {
                proveedor.addSelectOption({
                    value : resultIterator[index]["id"],
                    text : resultIterator[index]["name"]
                });
            }
			innerHtml="";
      
            if (scriptContext.request.method == 'POST') {
                f1 = f_Inicio.split("/")
                f2 = f_Final.split("/")
				
					var dias = dias_TranscurridosDelMes(f1[1] + "/" + f1[0] + "/" + f1[2], f2[1] + "/" + f2[0] + "/" + f2[2])
					var diash = dias_Habiles_del_mes(f1[1] + "/" + f1[0] + "/" + f1[2])
					innerHtml += '<br/><input type="text" id="dd" name="dd" class="form-control" value="' + Math.round(diash) + ' dias habiles del mes"readonly=""/>   <br/>';
					innerHtml += '<br/><input type="text" id="dd" name="dd" class="form-control" value="' + Math.round(dias) + ' dias laborados de el mes" readonly=""/>   <br/>';
                    
          
         var  tcompras=-1;
          if(sucursales==0){
                        var bsucursal="1,2,3,4,5,6,23"
                    }
					else{
                        var bsucursal=sucursales;
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
					/** SQL principal */
					var dias1432 =Dias_diferencia(f_Inicio, f_Final);
					var dias143222 =contarDomingos(f_Inicio, f_Final);
				var ff111=Dias_diferencia(f_Inicio, f_Final);
				  var valor_dedia=0
				if(dias1432==0){
				valor_dedia=1
				}else(
				valor_dedia=((dias1432*2)-dias143222)+1
				)
                    var sqlPrincipal = "select*from(SELECT t1.displayname as codigo,t1.articulo,venta,Round((utilidad/venta)*100,0) utilidad_en_porcentaje,utilidad utilidad_en_pesos ,round(t2.cantidad_vendida,0) venta_en_piezas , round(t1.cantidad_disponible,0) stock_dispinible,valor_de_stock,round((t1.cantidad_disponible)/(t2.cantidad_vendida/"+valor_dedia+"),0) as dias_de_inventario_en_piezas,round((valor_de_stock)/(venta/"+valor_dedia+"),0) as dias_de_inventario_en_dinero,CASE WHEN proveedor IS NULL THEN 'Sin Proveedor' ELSE proveedor END as proveedor FROM\
                    (\
                        SELECT \
                            item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
                        FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE  inventoryitemlocations.location IN("+bsucursal+") AND item.isInactive='F' "+bproveedor+" "+btcompra+" GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
                    ) t1 LEFT JOIN(\
                        SELECT\
                            t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,(NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
                        FROM(\
                            SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta, SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND ( SalesOrder.TranDate >='"+f_Inicio+"' AND SalesOrder.TranDate <='"+f_Final+"') AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+bsucursal+"))  GROUP BY item.itemid \
                        )t1 FULL OUTER JOIN\
                        (\
                            SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >='"+f_Inicio+"' AND SalesOrder.TranDate <='"+f_Final+"' ) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+bsucursal+")) GROUP BY item.itemid\
                        )t2 ON t1.itemid=t2.itemid\
                    )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) where venta >0  ";
						
					
                    do {
						var suiteQL = "SELECT * FROM ( SELECT ROWNUM AS ROWNUMBER, * FROM (" + sqlPrincipal + " ) ) WHERE (ROWNUMBER BETWEEN " + noRowInicio + " AND " + noRowFinal + ")";
						var resultIterator = query.runSuiteQL({ query: suiteQL }).asMappedResults();
						records = records.concat(resultIterator);
						var moreRecords = resultIterator.length < 5000 ? false : true;
						noRowInicio = noRowInicio + 5000;
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
		  valor_dedia=((dias1432*2)-dias143222)+1
		  )
		  
		  
				
		  
			  innerHtml+= ' <br/> <br/><input type="text" class="form-control" value="'+parseInt(valor_dedia)+' días" readonly><br/> <br/><table style="table-layout: fixed; width: 300%; border-spacing: 6px;">';
			
			  innerHtml+= '<tr>';
			  innerHtml+= '<td>';
			 
				  innerHtml+= '  <br/><br/> <div class="row">';
			  innerHtml+= ' <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 text-left">';
			  innerHtml+= '   <table class="display nowrap table table-sm table-bordered table-hover table-responsive-sm" id="resultsTable"> ';
			  if ( records.length > 0 ) {
		  
				var columncustrecord195s = Object.keys( records[0] );
				innerHtml+= '     <thead class="thead-light">';
				innerHtml+= '       <tr>';
				for ( i = 1; i < columncustrecord195s.length; i++ ) {
			  
		  
		  
				  innerHtml+= '     <th class="text-right text-uppercase"><H3>'+columncustrecord195s[i]+'</H3></th>';
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
				  for ( c = 1; c < columncustrecord195s.length; c++ ) {
		  
					// Nombre de la columna
					var column = columncustrecord195s[c];
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
			  htmlField.defaultValue = generadorHtml(innerHtml, records.length,f_Inicio ,f_Final,cantidad);
		  
		   
			  scriptContext.response.writePage( form );
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
			  
		  
			function generadorHtml(table, records,f_Inicio ,f_Final,cantidad){
			  var dias1432 =Dias_diferencia(f_Inicio, f_Final);
			  var dias143222 =contarDomingos(f_Inicio, f_Final);
		  var ff111=Dias_diferencia(f_Inicio, f_Final);
			var valor_dedia=0
		  if(dias1432==0){
		  valor_dedia=1
		  }else(
		  valor_dedia=((dias1432*2)-dias143222)+1
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
		  html += ' var validacion="'+cantidad+'"; console.log(validacion);validacion=validacion+1;';
		  html += ' var valor_dedia="'+valor_dedia+' "; console.log( "valor de dia "+valor_dedia); ';
		  
		  ////////////////
		  
		  html += '$("#resultsTable").on("search.dt", function() {';
		  html += '      var searchValue = $("#resultsTable_filter input").val();';
		  html += '      console.log("Valor del buscador:", searchValue);';
		  
		  html += '      var data = $("#resultsTable").DataTable().rows({ search: "applied" }).data();';
		  html += '          var valor_compra=0;';
		  html += '          var monto_rec=0;';
		  html += '          var monto_rest=0;';
		  
		  html += '    var utlidad=0;      var pedido=0;';
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
		  html += '  else if(prop==5){'
		  html += '             pedido+=parseFloat(value[prop]); '; 
		  html += '          }';
		  html += '  else if(prop==6){'
		  html += '             recibido+=parseFloat(value[prop]); '; 
		  html += '          }';
		  html += '  else if(prop==7){'
		  html += '             restante+=parseFloat(value[prop]);  '; 
		  html += '          }';
		  
		
		  html += '  '
		  html += '          '; 
		  html += '          ';
		
		  html += '          } utlidad =valor_compra*(monto_rec/100); console.log("utlidad init " +utlidad);';
		  
		  html += '    }); ';
		  html += ' console.log("utlidad C" +utlidad);  var monto_ps=restante/(valor_compra/valor_dedia);    var porcentd=(monto_rest/valor_compra)*100; ';
		  
		  html += ' var porc1=parseInt((monto_rec/valor_compra)*100) ;   valor_compra = valor_compra.toLocaleString("en-US", { style: "currency", currency: "USD" });';
		  html += '  console.log("valor total " + valor_compra);  ';
		  html += '  var monto_pz=recibido/(pedido/valor_dedia); monto_rest = monto_rest.toLocaleString("en-US", { style: "currency", currency: "USD" }); restante= restante.toLocaleString("en-US", { style: "currency", currency: "USD" });';
		
		
		  html += '  console.log("valor total " + valor_compra);  ';
		  html += '  console.log("monto_rec " + monto_rec);  ';
		  html += '  console.log("monto_rest " + monto_rest);  ';
		  
		  html += '  console.log("valor pedido " + pedido);  ';
		  html += '  console.log("recibido " + recibido);  ';
		  html += '  console.log("restante " + restante);  ';
		  
		  html += '$("#ttf").empty(); $("#ttf").append( `<tr><td  >Total de articulos `+cont+`</td><td  ></td><td  class="precio  text-right ">`+valor_compra+` </td>  <td  class="precio  text-right ">`+parseInt(porcentd)+`% </td><td  class="  text-right ">`+monto_rest+` </td>  <td  class="  text-right ">`+parseInt(pedido)+` </td>  <td  class="  text-right ">`+recibido+` </td> <td  class="  text-right ">`+restante+` </td> <td  class="  text-right ">`+parseInt(monto_pz)+` </td>  <td  class="  text-right ">`+parseInt(monto_ps)+` </td>     </tr>` ); ';  
		  
		  
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
		  
		  
		  
		  
		  
		   html += '  var indiceColumna = 1; '
		   html += '  var indiceColumna5 = 2; '
			html += '  var indiceColumna6 = 3; '
			 html += '  var indiceColumna7 = 7; '
			 html += '  var indiceColumna4= 4; '
			html += "      $('#resultsTable tbody tr').each(function(){"
		
			html += "     $(this).find('td').eq(indiceColumna5).addClass('precio'); "   
			html += "     $(this).find('td').eq(indiceColumna7).addClass('precio'); "   
			  html += "     $(this).find('td').eq(indiceColumna4).addClass('precio'); "   
			html += "     $(this).find('td').eq(indiceColumna6).addClass('porcentaje'); "   
			html += '      });  '
		
		
		
		
		 html += '  var indiceColumna = 2; '
		 html += '  var indiceColumna5 = 3; '
		  html += '  var indiceColumna6 = 4; '
		   html += '  var indiceColumna7 = 6; '
			  
		  html += "      $('#resultsTable tbody tr').each(function(){"
		  html += "     $(this).find('td').eq(indiceColumna).addClass('precio'); "
		 
		  html += '      }); '
		
		
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



			  html += ' var tabla = document.getElementById("resultsTable");'

			  html += 'var filas = tabla.getElementsByTagName("tr");'
			  html += 'for (var i = 1; i < filas.length; i++) {'
				html += ' var celdas = filas[i].getElementsByTagName("td");'
  
				html += 'celdas[9].textContent = parseFloat(celdas[9].textContent).toString();'
				html += 'celdas[8].textContent = parseFloat(celdas[8].textContent).toString();'
				html += '}'
		  
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
		  function dias_TranscurridosDelMes(f1, f2) {
            // Obtén la fecha actual
            var fechaActual = new Date(f2);
            // Obtén el primer día del mes actual
            var mes_actual = 0;

            var primerDiaDelMes = new Date(f1);

            // Inicializa el contador de días sin contar domingos y días festivos
            var diasSinDomingos = 0;
            // Itera sobre cada día desde el primer día del mes hasta la fecha actual
            for (var i = primerDiaDelMes.getDate(); i <= fechaActual.getDate(); i++) {
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
            if (mes_actual == 1) {
                return 24;
            }
            if (mes_actual == 12) {
                return 24;
            }
            if (mes_actual == 2) {
                return diasSinDomingos - 1;
            }
            else {
                return diasSinDomingos;
            }

        }


        function dias_Habiles_del_mes(customrecord687) {
            // Obtén la fecha actual
            var fechaActual = new Date(customrecord687);
            //var mes_actual = customrecord687


            // Obtén el primer día del mes actual
            var primerDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);

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

            // Muestra el resultado en la consola o en algún elemento HTML
            return diasSinDomingos;


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
                new Date(fecha.getFullYear(), 11, 25), // 25 de diciembre
				/* DIAS SANTOS */
                new Date(fecha.getFullYear(), 2, 28), // 25 de diciembre
                new Date(fecha.getFullYear(), 2, 29), // 25 de diciembre
                new Date(fecha.getFullYear(), 2, 30) // 25 de diciembre
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
            var diasHastaLunes = (diaDeLaSemana === 1) ? 14 : (22 - diaDeLaSemana);
            var tercerLunes = new Date(anio, 2, 1 + diasHastaLunes);
			//log.error("a",diaDeLaSemana)
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

		function modificarMes(fechaOrigen, meses) {
            const fecha = new Date(fechaOrigen); //¡se hace esto para no modificar la fecha original!
            const mes = fecha.getMonth();
            fecha.setMonth(fecha.getMonth() + meses);
            while (fecha.getMonth() === mes) {
                fecha.setDate(fecha.getDate() - 1);
            }
            return fecha;
        }
		
		function fechaHoy() {
			var today = new Date();
			var fecha = parseInt(today.getDate()) < 10 ? '0' + today.getDate() : today.getDate();
			fecha += '/';
			fecha += parseInt(today.getMonth() + 1) < 10 ? '0' + parseInt(today.getMonth() + 1) : parseInt(today.getMonth() + 1);
			fecha += '/';
			fecha += today.getFullYear();
			return fecha;
		}
		function validar_mismo_mes(f1, f2) {
            const fecha = new Date(f1); //¡se hace esto para no modificar la fecha original!
            const fecha2 = new Date(f2); //¡se hace esto para no modificar la fecha original!
            const mes = fecha.getMonth();
            const mes2 = fecha2.getMonth();

            if (mes == mes2) {
                a = true
            } else {
                a = false
            }
            return a;
        }
        function dias_TranscurridosDelMes(f1, f2) {
            // Obtén la fecha actual
            var fechaActual = new Date(f2);
            // Obtén el primer día del mes actual
            var mes_actual = 0;

            var primerDiaDelMes = new Date(f1);

            // Inicializa el contador de días sin contar domingos y días festivos
            var diasSinDomingos = 0;
            // Itera sobre cada día desde el primer día del mes hasta la fecha actual
            for (var i = primerDiaDelMes.getDate(); i <= fechaActual.getDate(); i++) {
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
            if (mes_actual == 1) {
                return 24;
            }
            if (mes_actual == 12) {
                return 24;
            }
            if (mes_actual == 2) {
                return diasSinDomingos - 1;
            }
            else {
                return diasSinDomingos;
            }

        }


        function dias_Habiles_del_mes(customrecord687) {
            // Obtén la fecha actual
            var fechaActual = new Date(customrecord687);
            //var mes_actual = customrecord687


            // Obtén el primer día del mes actual
            var primerDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);

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

            // Muestra el resultado en la consola o en algún elemento HTML
            return diasSinDomingos;


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
                new Date(fecha.getFullYear(), 11, 25), // 25 de diciembre
				/* DIAS SANTOS */
                new Date(fecha.getFullYear(), 2, 28), // 25 de diciembre
                new Date(fecha.getFullYear(), 2, 29), // 25 de diciembre
                new Date(fecha.getFullYear(), 2, 30) // 25 de diciembre
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
            var diasHastaLunes = (diaDeLaSemana === 1) ? 14 : (22 - diaDeLaSemana);
            var tercerLunes = new Date(anio, 2, 1 + diasHastaLunes);
			//log.error("a",diaDeLaSemana)
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

		function modificarMes(fechaOrigen, meses) {
            const fecha = new Date(fechaOrigen); //¡se hace esto para no modificar la fecha original!
            const mes = fecha.getMonth();
            fecha.setMonth(fecha.getMonth() + meses);
            while (fecha.getMonth() === mes) {
                fecha.setDate(fecha.getDate() - 1);
            }
            return fecha;
        }

			return {
			  onRequest: onRequest
			}
		  });
		  