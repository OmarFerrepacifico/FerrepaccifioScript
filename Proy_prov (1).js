/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/currentRecord', 'N/format/i18n', 'N/log', 'N/query', 'N/record', 'N/runtime', 'N/search', 'N/ui/serverWidget'],
    /**
 * @param{currentRecord} currentRecord
 * @param{i18n} i18n
 * @param{log} log
 * @param{query} query
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (currentRecord, i18n, log, query, record, runtime, search, serverWidget) => {
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
            var delimiter = /\u0005/;
            var f_Inicio = scriptContext.request.method == 'POST' ? scriptContext.request.parameters.custpage_field_inicio : fechaHoy();
            var f_Final = scriptContext.request.method == 'POST' ? scriptContext.request.parameters.custpage_field_final : fechaHoy();
            var ubicaciones	= scriptContext.request.method == 'POST' ? scriptContext.request.parameters.custpage_location.split(delimiter) : '0,6,5,1,2,4,23,3,12,32,25,21,26';
            var noRowInicio = 0;
            var noRowFinal = 999999;
            var records = new Array();
            var form = serverWidget.createForm({
                title: 'Proyección de ventas de Proveedores',
                hideNavBar: false
            });

            /** Grupos */
            var fieldgroup = form.addFieldGroup({
                id: 'grupofiltros',
                label: 'Filtros'
            });

            form.clientScriptModulePath = './Ferre - actualizar cuotas vendedores.js';
            form.addSubmitButton({ label: 'Generar Reporte' });
            form.addButton({
                id: 'otra_accion2',
                label: 'Actualizar Objetivos',
                functionName: 'Aprovacion_de_Analisis'
            });
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
            var locations = form.addField({
				id: "custpage_location",
				type: serverWidget.FieldType.SELECT,
				label: "Ubicacion",
				container: 'grupofiltros'
			}).setHelpText({ help: "Seleccionar al menos una sucursal" });
			
			locations.defaultValue = ubicaciones;
            locations.addSelectOption({
				value : '0',
				text : 'Todas'
			});
			locations.addSelectOption({
				value : '6',
				text : 'Cantamar'
			});
			
			locations.addSelectOption({
				value : '1',
				text : 'Tlaquepaque'
			});
			locations.addSelectOption({
				value : '2',
				text : 'La Huerta'
			});
			locations.addSelectOption({
				value : '3',
				text : 'Melaque'
			});
			locations.addSelectOption({
				value : '4',
				text : 'Villa Purificación'
			});
			locations.addSelectOption({
				value : '5',
				text : 'Fondeport'
			});
			locations.addSelectOption({
				value : '23',
				text : 'Mayoreo'
			});
            //////////////////////////////////////////////////////////////////////////////////
            var tab = form.addTab({
                id: 'tabid1',
                label: 'Reporte'
            });

            var tab = form.addTab({
                id: 'tabid2',
                label: 'Carga de Información'
            });
            ////////////////////////////////////////////////////////////////////
            var amoo = form.addField({
                id: "custpage_anos",
                type: serverWidget.FieldType.SELECT,
                label: "Año",
                source: "customlist_ferre_anos_consulta",
                container: 'tabid2'
            }).setHelpText({ help: "Obtener El marca" });
            amoo.isMandatory = false;
            amoo.updateLayoutType({
                layoutType: serverWidget.FieldLayoutType.STARTROW
            });
            var mess = form.addField({
                id: "custpage_customrecormes",
                type: serverWidget.FieldType.SELECT,
                label: "Mes",
                source: "customlist_be_months_accounts",
                container: 'tabid2'
            }).setHelpText({ help: "Obtener El marca" });
            mess.isMandatory = false;
            mess.updateLayoutType({
                layoutType: serverWidget.FieldLayoutType.MIDROW
            });

            form.addField({
                id: 'custpage_venta_neta_pro',
                type: serverWidget.FieldType.CURRENCY,
                label: 'Venta Neta propuesta',
                container: 'tabid2'
            })
            form.addField({
                id: 'custpage_venta_utilidad_pro',
                type: serverWidget.FieldType.CURRENCY,
                label: 'Venta Utilitaria propuesta',
                container: 'tabid2'
            })
            var vendedor = form.addField({
                id: "custpage_vendedor",
                type: serverWidget.FieldType.SELECT,
                label: "Vendedores",
                container: 'tabid2'
            }).setHelpText({ help: "Seleccionar al menos una sucursal" });

            var sqlPrincipal = "SELECT id,entityid FROM EMPLOYEE WHERE issalesrep='T' AND isinactive='F' AND subsidiary='2' ORder BY entityid ASC";
            do {
                var suiteQL = "SELECT * FROM ( SELECT ROWNUM AS ROWNUMBER, * FROM (" + sqlPrincipal + " ) ) WHERE (ROWNUMBER BETWEEN " + noRowInicio + " AND " + noRowFinal + ")";
                var resultIterator = query.runSuiteQL({ query: suiteQL }).asMappedResults();
                records = records.concat(resultIterator);
                var moreRecords = resultIterator.length < 5000 ? false : true;
                noRowInicio = noRowInicio + 5000;
            } while (moreRecords);
            //var columnNames = Object.keys(records[0]);
            for (r = 0; r < records.length; r++) {
                var record = records[r];
                vendedor.addSelectOption({
                    value: record["id"],
                    text: record["entityid"]
                });


            }
            form.addField({
                id: 'custpage_venta_neta',
                type: serverWidget.FieldType.CURRENCY,
                label: 'Venta Neta',
                container: 'tabid2'
            })
            form.addField({
                id: 'custpage_venta_utilidad',
                type: serverWidget.FieldType.CURRENCY,
                label: 'Venta Utilitaria',
                container: 'tabid2'
            })
            //////////////////////////////////////////////////////////////////////
            var htmlField = form.addField({
                id: 'custpage_field_html',
                type: serverWidget.FieldType.INLINEHTML,
                label: 'HTML',
                container: 'tabid1'
            });
            innerHtml = "";
            //customrecord6871.defaultValue = customrecord687;
            if (scriptContext.request.method == 'POST') {
                f1 = f_Inicio.split("/")
                f2 = f_Final.split("/")

                if (validar_mismo_mes(f1[1] + "/" + f1[0] + "/" + f1[2], f2[1] + "/" + f2[0] + "/" + f2[2])) {
                    var dias = dias_TranscurridosDelMes(f1[1] + "/" + f1[0] + "/" + f1[2], f2[1] + "/" + f2[0] + "/" + f2[2])
                    var diash = dias_Habiles_del_mes(f1[1] + "/" + f1[0] + "/" + f1[2])
                    innerHtml += '<br/><input type="text" id="dd" name="dd" class="form-control" value="' + Math.round(diash) + ' dias habiles del mes"readonly=""/>   <br/>';
                    innerHtml += '<br/><input type="text" id="dd" name="dd" class="form-control" value="' + Math.round(dias) + ' dias laborados de el mes" readonly=""/>   <br/>';

                    finaldia = new Date(modificarMes(f1[1] + "/" + f1[0] + "/" + f1[2], -1));
                    finaldias = new Date(finaldia.getFullYear(), finaldia.getMonth() + 1, 0);
                    finaldiass = finaldias.toLocaleDateString().split("-")
                    log.error("a", finaldiass[2] + "/" + finaldiass[1] + "/" + finaldiass[0])
                    //ojo: a partir del cuarto mes, de nuevo devuelve resultados "inesperados":
                    primerdia = new Date(modificarMes(f1[1] + "/" + f1[0] + "/" + f1[2], -3));
                    primerdias = new Date(primerdia.getFullYear(), primerdia.getMonth(), 1);
                    primerdiass = primerdias.toLocaleDateString().split("-")
                    log.error("a", primerdiass[2] + "/" + primerdiass[1] + "/" + primerdiass[0])
                    var noRowInicio = 0;
                    var noRowFinal = 999999;
                    var recordss = new Array();

                 
                        var sqlPrincipal = "SELECT  "+
                 "      CASE "+
                 "      WHEN t1.entityid IS NULL THEN "+
                 "      t2.vendedor "+
                 "      WHEN t2.vendedOR IS NULL THEN "+
                 "      t3.vendedor "+
                 "      ELSE t1.entityid "+
                 "      END AS vendedor,(t3.venta_neta/3) AS venta_neta_promedio__3___,t1.custrecord_venta_neta AS venta_neta_asignada,'0' AS objetivo_objetivo_al_dia,t2.venta_neta,'0' AS porcentaje,(t3.venta_utilidad /3) AS utilidad_promedio__3___,t1.custrecord_utilidad AS utilidad_asignada,'0' AS utilidad_objetivo_al_dia, t2.venta_utilidad,'0' AS porcentaje_utilidad "+
                 "      FROM (SELECT ( "+
                 "      CASE "+
                 "      WHEN employee.entityid='LAURA VIANEY GARCIA RIOS' THEN "+
                 "      'LAURA VIANEY GARCIA' "+
                 "      ELSE employee.entityid END) AS entityid,custrecord_venta_neta,custrecord_utilidad "+
                 "      FROM customrecord_ferre_cuota_vendedores "+
                 "  JOIN customlist_ferre_anos_consulta "+
                 "      ON customlist_ferre_anos_consulta.id=customrecord_ferre_cuota_vendedores.custrecord_ano_cuota "+
                 "  JOIN employee "+
                 "      ON customrecord_ferre_cuota_vendedores.custrecord_vendedor_cuota =employee.id "+
                 "      WHERE custrecord_mes_cuota='2' "+
                 "          AND customlist_ferre_anos_consulta.name='2024' )t1 "+
                 "  JOIN (SELECT REPLACE( "+
                 "      CASE "+
                 "      WHEN t1.custbodycustrecord_vendedor_msp IS NULL THEN "+
                 "      t2.custbodycustrecord_vendedor_msp "+
                 "      ELSE t1.custbodycustrecord_vendedor_msp END,'�','Ñ') AS VENDEDOR,(NVL(t1.VentaNeta,0)+NVL( t2.ventanetas, 0 ) + NVL(t2.ventanet,0)) AS venta_neta, (NVL(t1.VentaUtilitaria,0)+NVL( t2..Utilidades, 0 ) + NVL(t2.vutilidades,0)) AS venta_utilidad "+
                 "      FROM (SELECT SUM(  "+
                 "      CASE "+
                 "      WHEN SalesOrder.terms=20 THEN "+
                 "      SOLine.netamount "+
                 "      WHEN SalesOrder.terms=4 THEN "+
                 "      SOLine.netamount "+
                 "      ELSE SOLine.netamount *0.95 END)*-1 AS VentaNeta, SUM(( "+
                 "      CASE "+
                 "      WHEN SalesOrder.terms=20 THEN "+
                 "      SOLine.netamount "+
                 "      WHEN SalesOrder.terms=4 THEN "+
                 "      SOLine.netamount "+
                 "      ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 AS VentaUtilitaria,REPLACE(item.custitem10 ,'�','Ñ') AS custbodycustrecord_vendedor_msp "+
                 "      FROM TransactiON AS SalesOrder "+
                 "  INNER JOIN TransactionLine AS SOLine "+
                 "      ON ( SOLine.TransactiON = SalesOrder.ID ) "+
                 "          AND ( SOLine.MainLine = 'F' ) "+
                 "  INNER JOIN locatiON AS Ubicacion "+
                 "      ON ( SOLine.location= Ubicacion.id ) "+
                 "  INNER JOIN Customer AS cliente "+
                 "      ON ( cliente.id= SalesOrder.entity) "+
                 "  INNER JOIN Item "+
                 "      ON ( Item.ID = SOLine.Item ) FULL OUTER "+
                 "  JOIN customerCategory "+
                 "      ON cliente.category=customerCategory.id "+
                 "  LEFT JOIN employee "+
                 "      ON cliente.salesrep = employee.id "+
                 "      WHERE ( SalesOrder.Type = 'CustInvc' ) "+
                 "          AND ( SalesOrder.TranDate >='01/02/2024' "+
                 "          AND SalesOrder.TranDate <='22/02/2024') "+
                 "          AND ( SalesOrder.Void = 'F' ) "+
                 "          AND ( SalesOrder.Voided = 'F' ) "+
                 "          AND ( Item.ItemType <> 'Discount' ) "+
                 "          AND ( Item.ItemType != 'Service' ) "+
                 "          AND ( Item.ItemType != 'Assembly' ) "+
                 "          AND ( Item.id!=25311 ) "+
                 "          AND ( Ubicacion.id=1 "+
                 "          OR Ubicacion.id=2 "+
                 "          OR Ubicacion.id=3 "+
                 "          OR Ubicacion.id=4 "+
                 "          OR Ubicacion.id=5 "+
                 "          OR Ubicacion.id=6 "+
                 "          OR Ubicacion.id=23) "+
                 "      GROUP BY  REPLACE(item.custitem10 , "+
                 "          '�', "+
                 "          'Ñ'))t1 FULL OUTER JOIN( "+
                 "              SELECT SUM( "+
                 "      CASE "+
                 "      WHEN SalesOrder.custbody_bex_tiponc=1 THEN "+
                 "      (SOLine.netamount * -1)ELSE 0 END) AS ventanet,SUM(  "+
                 "      CASE "+
                 "      WHEN SalesOrder.custbody_bex_tiponc=1 THEN "+
                 "      ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) AS vutilidades,SUM(  "+
                 "      CASE "+
                 "      WHEN SalesOrder.custbody_bex_tiponc=3 "+
                 "          AND Item.id!=19012 "+
                 "          AND Item.id!=18918 "+
                 "          AND Item.id!=18921 THEN "+
                 "      (SOLine.netamount * -1) "+
                 "      ELSE 0 END) AS ventanetas,SUM(  "+
                 "      CASE "+
                 "      WHEN SalesOrder.custbody_bex_tiponc=3 THEN "+
                 "      ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) AS Utilidades,REPLACE(item.custitem10 ,'�','Ñ') AS custbodycustrecord_vendedor_msp "+
                 "      FROM TransactiON AS SalesOrder "+
                 "  INNER JOIN TransactionLine AS SOLine "+
                 "      ON ( SOLine.TransactiON = SalesOrder.ID ) "+
                 "          AND ( SOLine.MainLine = 'F' ) "+
                 "  INNER JOIN locatiON AS Ubicacion "+
                 "      ON ( SOLine.location= Ubicacion.id ) FULL OUTER "+
                 "  JOIN Customer AS cliente "+
                 "      ON ( cliente.id= SalesOrder.entity) "+
                 "  INNER JOIN Item "+
                 "      ON ( Item.ID = SOLine.Item ) FULL OUTER "+
                 "  JOIN customerCategory "+
                 "      ON cliente.category=customerCategory.id "+
                 "  LEFT JOIN employee "+
                 "      ON cliente.salesrep = employee.id "+
                 "      WHERE ( SalesOrder.Type ='CustCred') "+
                 "          AND ( SalesOrder.TranDate >='01/02/2024' "+
                 "          AND SalesOrder.TranDate <='22/02/2024') "+
                 "          AND ( SalesOrder.Void = 'F' ) "+
                 "          AND ( SalesOrder.Voided = 'F' ) "+
                 "          AND ( Item.ItemType <> 'Discount' ) "+
                 "          AND ( Item.ItemType != 'Assembly' ) "+
                 "          AND ( Item.id!=25311 ) "+
                 "          AND ( SalesOrder.custbody_bex_tiponc=1 "+
                 "          OR SalesOrder.custbody_bex_tiponc=3) "+
                 "          AND ( Ubicacion.id=1 "+
                 "          OR Ubicacion.id=2 "+
                 "          OR Ubicacion.id=3 "+
                 "          OR Ubicacion.id=4 "+
                 "          OR Ubicacion.id=5 "+
                 "          OR Ubicacion.id=6 "+
                 "          OR Ubicacion.id=23) "+
                 "      GROUP BY  REPLACE(item.custitem10 ,'�','Ñ'))t2 "+
                 "      ON t2.custbodycustrecord_vendedor_msp=t1.custbodycustrecord_vendedor_msp )t2 "+
                 "      ON t1.entityid=t2.VENDEDOR "+
                 "  LEFT JOIN ( item.custitem10 VENDEDOR,(NVL(t1.VentaNeta,0)+NVL( t2.ventanetas, 0 ) + NVL(t2.ventanet,0)) AS venta_neta, (NVL(t1.VentaUtilitaria,0)+NVL( t2..Utilidades, 0 ) + NVL(t2.vutilidades,0)) AS venta_utilidad "+
                 "      FROM (SELECT SUM(  "+
                 "      CASE "+
                 "      WHEN SalesOrder.terms=20 THEN "+
                 "      SOLine.netamount "+
                 "      WHEN SalesOrder.terms=4 THEN "+
                 "      SOLine.netamount "+
                 "      ELSE SOLine.netamount *0.95 END)*-1 AS VentaNeta, SUM(( "+
                 "      CASE "+
                 "      WHEN SalesOrder.terms=20 THEN "+
                 "      SOLine.netamount "+
                 "      WHEN SalesOrder.terms=4 THEN "+
                 "      SOLine.netamount "+
                 "      ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 AS VentaUtilitaria,item.custitem10  "+
                 "      FROM TransactiON AS SalesOrder "+
                 "  INNER JOIN TransactionLine AS SOLine "+
                 "      ON ( SOLine.TransactiON = SalesOrder.ID ) "+
                 "          AND ( SOLine.MainLine = 'F' ) "+
                 "  INNER JOIN locatiON AS Ubicacion "+
                 "      ON ( SOLine.location= Ubicacion.id ) "+
                 "  INNER JOIN Customer AS cliente "+
                 "      ON ( cliente.id= SalesOrder.entity) "+
                 "  INNER JOIN Item "+
                 "      ON ( Item.ID = SOLine.Item ) FULL OUTER "+
                 "  JOIN customerCategory "+
                 "      ON cliente.category=customerCategory.id "+
                 "  LEFT JOIN employee "+
                 "      ON cliente.salesrep = employee.id "+
                 "      WHERE ( SalesOrder.Type = 'CustInvc' ) "+
                 "          AND ( SalesOrder.TranDate >='01/11/2023' "+
                 "          AND SalesOrder.TranDate <='31/01/2024') "+
                 "          AND ( SalesOrder.Void = 'F' ) "+
                 "          AND ( SalesOrder.Voided = 'F' ) "+
                 "          AND ( Item.ItemType <> 'Discount' ) "+
                 "          AND ( Item.ItemType != 'Service' ) "+
                 "          AND ( Item.ItemType != 'Assembly' ) "+
                 "          AND ( Item.id!=25311 ) "+
                 "          AND ( Ubicacion.id=1 "+
                 "          OR Ubicacion.id=2 "+
                 "          OR Ubicacion.id=3 "+
                 "          OR Ubicacion.id=4 "+
                 "          OR Ubicacion.id=5 "+
                 "          OR Ubicacion.id=6 "+
                 "          OR Ubicacion.id=23) "+
                 "      GROUP BY  item.custitem10 )t1 FULL OUTER JOIN(SELECT SUM( "+
                 "      CASE "+
                 "      WHEN SalesOrder.custbody_bex_tiponc=1 THEN "+
                 "      (SOLine.netamount * -1)ELSE 0 END) AS ventanet,SUM(  "+
                 "      CASE "+
                 "      WHEN SalesOrder.custbody_bex_tiponc=1 THEN "+
                 "      ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) AS vutilidades,SUM(  "+
                 "      CASE "+
                 "      WHEN SalesOrder.custbody_bex_tiponc=3 "+
                 "          AND Item.id!=19012 "+
                 "          AND Item.id!=18918 "+
                 "          AND Item.id!=18921 THEN "+
                 "      (SOLine.netamount * -1) "+
                 "      ELSE 0 END) AS ventanetas,SUM(  "+
                 "      CASE "+
                 "      WHEN SalesOrder.custbody_bex_tiponc=3 THEN "+
                 "      ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) AS Utilidades,item.custitem10  "+
                 "      FROM TransactiON AS SalesOrder "+
                 "  INNER JOIN TransactionLine AS SOLine "+
                 "      ON ( SOLine.TransactiON = SalesOrder.ID ) "+
                 "          AND ( SOLine.MainLine = 'F' ) "+
                 "  INNER JOIN locatiON AS Ubicacion "+
                 "      ON ( SOLine.location= Ubicacion.id ) FULL OUTER "+
                 "  JOIN Customer AS cliente "+
                 "      ON ( cliente.id= SalesOrder.entity) "+
                 "  INNER JOIN Item "+
                 "      ON ( Item.ID = SOLine.Item ) FULL OUTER "+
                 "  JOIN customerCategory "+
                 "      ON cliente.category=customerCategory.id "+
                 "  LEFT JOIN employee "+
                 "      ON cliente.salesrep = employee.id "+
                 "      WHERE ( SalesOrder.Type ='CustCred') "+
                 "          AND ( SalesOrder.TranDate >='01/11/2023' "+
                 "          AND SalesOrder.TranDate <='31/01/2024') "+
                 "          AND ( SalesOrder.Void = 'F' ) "+
                 "          AND ( SalesOrder.Voided = 'F' ) "+
                 "          AND ( Item.ItemType <> 'Discount' ) "+
                 "          AND ( Item.ItemType != 'Assembly' ) "+
                 "          AND ( Item.id!=25311 ) "+
                 "          AND ( SalesOrder.custbody_bex_tiponc=1 "+
                 "          OR SalesOrder.custbody_bex_tiponc=3) "+
                 "          AND ( Ubicacion.id=1 "+
                 "          OR Ubicacion.id=2 "+
                 "          OR Ubicacion.id=3 "+
                 "          OR Ubicacion.id=4 "+
                 "          OR Ubicacion.id=5 "+
                 "          OR Ubicacion.id=6 "+
                 "          OR Ubicacion.id=23) "+
                 "      GROUP BY  item.custitem10 )t2 "+
                 "      ON t2.custbodycustrecord_vendedor_msp=t1.custbodycustrecord_vendedor_msp )t3 "+
                 "      ON t3.vendedor=t1.entityid  " 
                    
                    log.error("a", sqlPrincipal)
                    do {
                        var suiteQL = "SELECT * FROM ( SELECT ROWNUM AS ROWNUMBER, * FROM (" + sqlPrincipal + " ) ) WHERE (ROWNUMBER BETWEEN " + noRowInicio + " AND " + noRowFinal + ")";
                        var resultIterator = query.runSuiteQL({ query: suiteQL }).asMappedResults();
                        recordss = recordss.concat(resultIterator);
                        var moreRecords = resultIterator.length < 5000 ? false : true;
                        noRowInicio = noRowInicio + 5000;
                    } while (moreRecords);
                    log.error("a", resultIterator)
                    innerHtml += '<textarea>'+sqlPrincipal+'</textarea><table style="table-layout: fixed; width: 100%; border-spacing: 6px;">';
                    innerHtml += '<tr>';
                    innerHtml += '<td>';
                    innerHtml += '<div id="resultsDiv" style="display:none">';
                    innerHtml += '	<div class="table-responsive">';
                    innerHtml += '		<table class="display nowrap table table-sm table-bordered table-hover table-responsive-sm" id="resultsTable">';
                    if (recordss.length > 0) {

                        var columnNames = Object.keys(recordss[0]);
                        innerHtml += '			<thead class="thead-light">';
                        innerHtml += '				<tr>';
                        for (i = 1; i < columnNames.length; i++) {
                            innerHtml += '				<th>' + columnNames[i].replaceAll("___",")").replaceAll("__","(").replaceAll("_", " ") + '</th>';
                        }
                        innerHtml += '				</tr>';
                        innerHtml += '			</thead>';
                        innerHtml += '			<tbody>';
                        // Add the records to the sublist...
                        for (r = 0; r < recordss.length; r++) {
                            var exchangerate = 0;
                            var es_numero = false;

                            innerHtml += '			<tr>';
                            var record = recordss[r];

                            for (c = 1; c < columnNames.length; c++) {
                                // Nombre de la columna
                                var column = columnNames[c];
                                var value = record[column];
                                //value = value === null ? '&nbsp;' : value.toString();
                                /*if ( value.length > 300 ) {
                                    value = value.substring( 0, 297 ) + '...';
                                }*/
                                //log.error({title:"Acceso a reporte", details:c});

                                if (c == 6 || c == 11) {
                                    if(c == 6){
                                        value=(record['venta_neta']/(((record["venta_neta_asignada"]*1)/Math.round(diash)) * Math.round(dias)))*100;
                                    }
                                    else{
                                        value=(record['venta_utilidad']/(((record["utilidad_asignada"]*1)/Math.round(diash)) * Math.round(dias)))*100;
                                    }
                                    cost = parseFloat(value).toFixed(2);
                                    log.error({ title: "Acceso a reporte", details: value });
                                    if (cost == null || cost == '') {
                                        cost = 0
                                    }
                                    ventas = cost * 1;
                                    if (isNaN(ventas)) {
                                        ventas = 0;
                                        //log.error({title:"Acceso a reporte", details:record['nombre_articulo'] +" || "+record['stock_disponible']+" || "+value});
                                    }
                                    if (ventas<=79.99) {
                                        color="#FF0000"
                                    }
                                    else if (ventas>=80 && ventas<=94.99) {
                                        color="#F2FF00"
                                    }
                                    else {
                                        color="#00FF2A"
                                    }
                                    curFormatNum1 = numFormatter.format({
                                        number: ventas
                                    }); // curFormat1 is '€12,53'
                                    innerHtml += '<td style="background-color:'+color+'">' + curFormatNum1 + '%</td>';
                                }
                                else if (c == 4 || c == 9) {
                                    if(c==4)
                                        value=record["venta_neta_asignada"];
                                    else
                                        value=record["utilidad_asignada"];
                                    cost = parseFloat(value).toFixed(2);
                                    //stock=parseFloat(record['stock_disponible']).toFixed(2);
                                    if (cost == null || cost == '') {
                                        cost = 0
                                    }
                                    ventas = cost * 1;
                                    
                                    if (isNaN(ventas)) {
                                        ventas = 0;
                                        //log.error({title:"Acceso a reporte", details:record['nombre_articulo'] +" || "+record['stock_disponible']+" || "+value});
                                    }
                                    ventas = (ventas/Math.round(diash)) * Math.round(dias);
                                    curFormatNum1 = numFormatter.format({
                                        number: ventas
                                    }); // curFormat1 is '€12,53'
                                    innerHtml += '<td>$' + curFormatNum1 + '</td>';

                                }
                                else if (c == 2 || c == 3  || c == 5 || c == 7 || c == 8 || c == 10) {
                                    cost = parseFloat(value).toFixed(2);
                                    //stock=parseFloat(record['stock_disponible']).toFixed(2);
                                    if (cost == null || cost == '') {
                                        cost = 0
                                    }
                                    ventas = cost * 1;
                                    if (isNaN(ventas)) {
                                        ventas = 0;
                                        //log.error({title:"Acceso a reporte", details:record['nombre_articulo'] +" || "+record['stock_disponible']+" || "+value});
                                    }
                                    curFormatNum1 = numFormatter.format({
                                        number: ventas
                                    }); // curFormat1 is '€12,53'
                                    innerHtml += '<td>$' + curFormatNum1 + '</td>';

                                }
                                
                                else {
                                    innerHtml += '<td>' + value + '</td>';
                                }
                            }

                            innerHtml += '			</tr>';
                        }
                        innerHtml += '			</tbody>';
                        //Pie para totalización
                        innerHtml += '			<tfoot>';
                        innerHtml += '				<tr>';
                        innerHtml += '					<th style="text-align:right">Totales:</th>';
                        innerHtml += '					<th style="text-align:right"></th>';
                        innerHtml += '					<th style="text-align:right"></th>';
                        innerHtml += '					<th style="text-align:right"></th>';
                        innerHtml += '					<th style="text-align:right"></th>';
                        innerHtml += '					<th style="text-align:right" id="pvn"></th>';
                        innerHtml += '					<th style="text-align:right"></th>';
                        innerHtml += '					<th style="text-align:right"></th>';
                        innerHtml += '					<th style="text-align:right"></th>';
                        innerHtml += '					<th style="text-align:right"></th>';
                        innerHtml += '					<th style="text-align:right" id="pu"></th>';
                        innerHtml += '				</tr>';
                        innerHtml += '			</tfoot>';
                    } else {
                        innerHtml += '			<thead class="thead-light">';
                        innerHtml += '				<tr>';
                        innerHtml += '					<th></th>';
                        innerHtml += '				</tr>';
                        innerHtml += '			</thead>';
                        innerHtml += '			<tbody>';
                        innerHtml += '			</tbody>';
                    }
                    innerHtml += '		</table>';
                    innerHtml += '	</div>';
                    innerHtml += '</div>';
                    innerHtml += '</td>';
                    innerHtml += '</tr>';
                    innerHtml += '</table>';
                    innerHtml += '<div id="myModal" class="modal hide fade bd-example-modal-lg" tabindex="-1" role="dialog" data-backdrop="static" aria-hidden="true">';
                    innerHtml += '	<div class="modal-dialog modal-sm">';
                    innerHtml += '		<div class="modal-content">';
                    innerHtml += '			<div class="modal-header">';
                    innerHtml += '				<h3 class="modal-title" id="staticBackdropLabel"><img src="https://5017898.secure.netsuite.com/core/media/media.nl?id=1218538&c=5017898&h=QRxtucrTkQdFoJrciA6UU--INdAQBQdP79dXoPO7tLooFPsr" width="30px">&nbsp;&nbsp;&nbsp;Procesando</h3>';
                    innerHtml += '			</div>';
                    innerHtml += '			<div class="modal-body">';
                    innerHtml += '				Generando reporte, espere...';
                    innerHtml += '			</div>';
                    innerHtml += '		</div>';
                    innerHtml += '	</div>';
                    innerHtml += '</div>';
                } else {
                    innerHtml += "<script>window.alert('No son del mismo mes las fechas de los filtros');</script>";


                }
            }
            htmlField.defaultValue = generadorHtml(innerHtml, records.length);
            scriptContext.response.writePage(form);
        }
        function generadorHtml(table, records) {
            var html = "";
            html += '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>';
            html += '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>';
            html += '<script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>';
            html += '<script src="https://cdn.datatables.net/rowgroup/1.2.0/js/dataTables.rowGroup.min.js"></script>';
            html += '<script src="https://cdn.datatables.net/buttons/1.6.2/js/dataTables.buttons.min.js"></script>';
            html += '<script src="https://cdn.datatables.net/datetime/1.5.1/js/dataTables.dateTime.min.js"></script>';
            html += '<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.2/moment.min.js"></script>';
            html += '<script src="https://cdn.datatables.net/buttons/1.6.2/js/buttons.html5.min.js"></script>';
            html += '<script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.53/build/vfs_fonts.js"></script>';
            html += '<script src="https://cdn.datatables.net/buttons/1.6.2/js/buttons.flash.min.js"></script>';
            html += '<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>';
            html += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">';
            html += '<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.css">';
            html += '<link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.6.2/css/buttons.dataTables.min.css">';
            html += '<link rel="stylesheet" href="https://cdn.datatables.net/rowgroup/1.2.0/css/rowGroup.dataTables.min.css">';
            html += '<style type = "text/css">'

            html += '	td, th {';
            html += '		font-size: 10pt;';
            html += '		border: 3px;';
            html += '	}'

            html += '	th {'
            html += '		text-transform: uppercase;';
            html += '		font-weight: bold;';
            html += '	}';

            html += '	.dt-buttons{';
            html += '		margin-left:20px;';
            html += '	}';

            html += '	table.dataTable tr.group-end td {';
            html += '		text-align: right;';
            html += '	font-weight: normal;';
            html += '	}';

            html += '</style>'

            html += table;
            html += '<script>';
            html += '	$("#main_form").submit(function(){';
            html += '		if ($("#submitted").val() == "T") {';
            html += '			$("#myModal").modal("show");';
            html += '		}';
            html += '	});';
            html += '	var table = $("#resultsTable").DataTable({';

            html += records > 0 ? '		"order": [[1, "asc"]],' : '';
            html += records > 0 ? '		"lengthMenu": [[-1], [ "Todos"]],' : '';
            html += '		"language": {"url":"https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"},';
            // Agrupador:
            /*html += '		rowGroup: {';
            html += '			startRender:null, ';
            html += '			endRender: function (rows, group){';
            html += '				var cant = rows.data().pluck(1).reduce(';
            html += '					function(a, b){';
            html += '						return a + b * 1;';
            html += '					}, 0);';
            html += '			var c = $.fn.dataTable.render.number(",", ".", 2, "").display(cant); ';
            html += '			var bombeoAvg = rows.data().pluck(1).reduce(';
            html += '				function (a, b) {';
            html += '					return a + b * 1;';
            html += '				}, 0) / rows.count();';
            html += '			return $("<tr/>")';
            html += '				.append( "<td colspan=1 style=text-align:right;><b> &nbsp; </b></td>" )';
            html += '			},';
            html += '			dataSrc: 0';
            html += '		},';*/

            html += '		"initComplete": function(){';
            /*html += 'this.api().columns([ 1, 2]).every( function () {'
            html += '	var column = this;'
            html += '	var select = $(\'<select><option value=""></option></select>\')'
            html += '.appendTo( $(column.header()) )'
            html += '.on( \'change\', function () {'
            html += 'var val = $.fn.dataTable.util.escapeRegex('
            html += '$(this).val()'
            html += ');'

            html += 'column'
            html += '.search( val ? \'^\'+val+\'$\' : \'\', true, false )'
            html += '.draw();'
            html += '} );'

            html += 'column.data().unique().sort().each( function ( d, j ) {'
            html += 'select.append( \'<option value="\'+d+\'">\'+d+\'</option>\' )'
            html += '} );'
            html += '} );'*/
            html += '			$("#resultsDiv").show(); ';
            //html += '			table.columns.adjust().draw(); ';
            html += '		},';


            /** Pie para totalización */
            if (records > 0) {
                html += '	footerCallback: function (row, data, start, end, display) {';
                html += '		var api = this.api();';

                // Remove the formatting to get integer data for summation
                html += '		var intVal = function (i) {';
                html += '			return typeof i === "string" ? i.replace(/[\$,]/g, "") * 1 : typeof i === "number" ? i : 0;';
                html += '		};';

                // Total over all pages
                html += '		total = api';
                html += '			.column(1)';
                html += '			.data()';
                html += '			.reduce(function (a, b) {';
                html += '			return intVal(a) + intVal(b);';
                html += '		}, 0);';

                // Total over this page
                html += '		pageTotal = api';
                html += '			.column(1, { page: "current" })';
                html += '			.data()';
                html += '			.reduce(function (a, b) {';
                html += '			return intVal(a) + intVal(b);';
                html += '		}, 0);';

                // Update footer
                html += '		$(api.column(1).footer()).html("Suma de total bombeo");';
                html += '		$(api.column(1).footer()).html(" <b>$" + $.fn.dataTable.render.number(",", ".", 2, "").display(pageTotal) + "</b> ");';
                // Total over all pages
                html += '		total = api';
                html += '			.column(2)';
                html += '			.data()';
                html += '			.reduce(function (a, b) {';
                html += '			return intVal(a) + intVal(b);';
                html += '		}, 0);';

                // Total over this page
                html += '		pageTotal = api';
                html += '			.column(2, { page: "current" })';
                html += '			.data()';
                html += '			.reduce(function (a, b) {';
                html += '			return intVal(a) + intVal(b);';
                html += '		}, 0);';

                // Update footer
                html += '		$(api.column(2).footer()).html("Suma de total bombeo");';
                html += '		$(api.column(2).footer()).html(" <b>$" + $.fn.dataTable.render.number(",", ".", 2, "").display(pageTotal) + "</b>  ");';
                // Total over all pages
                html += '		total3 = api';
                html += '			.column(3, { page: "current" })';
                html += '			.data()';
                html += '			.reduce(function (a, b) {';
                html += '			return intVal(a) + intVal(b);';
                html += '		}, 0);';

                // Total over this page
                html += '		pageTotal = api';
                html += '			.column(3, { page: "current" })';
                html += '			.data()';
                html += '			.reduce(function (a, b) {';
                html += '			return intVal(a) + intVal(b);';
                html += '		}, 0);';

                // Update footer
                html += '		$(api.column(3).footer()).html("Suma de total bombeo");';
                html += '		$(api.column(3).footer()).html(" <b>$" + $.fn.dataTable.render.number(",", ".", 2, "").display(pageTotal) + "</b>  ");';
                // Total over all pages
                html += '		total4 = api';
                html += '			.column(4, { page: "current" })';
                html += '			.data()';
                html += '			.reduce(function (a, b) {';
                html += '			return intVal(a) + intVal(b);';
                html += '		}, 0);';

                // Total over this page
                html += '		pageTotal = api';
                html += '			.column(4, { page: "current" })';
                html += '			.data()';
                html += '			.reduce(function (a, b) {';
                html += '			return intVal(a) + intVal(b);';
                html += '		}, 0);';

                // Update footer
                html += '		$(api.column(4).footer()).html("Suma de total bombeo");';
                html += '		$(api.column(4).footer()).html(" <b>$" + $.fn.dataTable.render.number(",", ".", 2, "").display(pageTotal) + "</b>  ");';
                // Total over this page
                html += '		pageTotal = api';
                html += '			.column(6, { page: "current" })';
                html += '			.data()';
                html += '			.reduce(function (a, b) {';
                html += '			return intVal(a) + intVal(b);';
                html += '		}, 0);';

                // Update footer
                html += '		$(api.column(6).footer()).html("Suma de total bombeo");';
                html += '		$(api.column(6).footer()).html(" <b>$" + $.fn.dataTable.render.number(",", ".", 2, "").display(pageTotal) + "</b>  ");';
                // Total over this page
                html += '		pageTotal = api';
                html += '			.column(7, { page: "current" })';
                html += '			.data()';
                html += '			.reduce(function (a, b) {';
                html += '			return intVal(a) + intVal(b);';
                html += '		}, 0);';

                // Update footer
                html += '		$(api.column(7).footer()).html("Suma de total bombeo");';
                html += '		$(api.column(7).footer()).html(" <b>$" + $.fn.dataTable.render.number(",", ".", 2, "").display(pageTotal) + "</b>  ");';
                // Total over all pages
                html += '		total8 = api';
                html += '			.column(8, { page: "current" })';
                html += '			.data()';
                html += '			.reduce(function (a, b) {';
                html += '			return intVal(a) + intVal(b);';
                html += '		}, 0);';
                // Total over this page
                html += '		pageTotal = api';
                html += '			.column(8, { page: "current" })';
                html += '			.data()';
                html += '			.reduce(function (a, b) {';
                html += '			return intVal(a) + intVal(b);';
                html += '		}, 0);';

                // Update footer
                html += '		$(api.column(8).footer()).html("Suma de total bombeo");';
                html += '		$(api.column(8).footer()).html(" <b>$" + $.fn.dataTable.render.number(",", ".", 2, "").display(pageTotal) + "</b>  ");';
                // Total over all pages
                html += '		total9 = api';
                html += '			.column(9, { page: "current" })';
                html += '			.data()';
                html += '			.reduce(function (a, b) {';
                html += '			return intVal(a) + intVal(b);';
                html += '		}, 0);';
                // Total over this page
                html += '		pageTotal = api';
                html += '			.column(9, { page: "current" })';
                html += '			.data()';
                html += '			.reduce(function (a, b) {';
                html += '			return intVal(a) + intVal(b);';
                html += '		}, 0);';

                // Update footer
                html += '		$(api.column(9).footer()).html("Suma de total bombeo");';
                html += '		$(api.column(9).footer()).html(" <b>$" + $.fn.dataTable.render.number(",", ".", 2, "").display(pageTotal) + "</b>  ");';
                
                html += '		$(api.column(5).footer()).html(" <b>" + $.fn.dataTable.render.number(",", ".", 2, "").display((total4/total3)*100) + "%</b>  ");';
                html += '		$(api.column(10).footer()).html(" <b>" + $.fn.dataTable.render.number(",", ".", 2, "").display((total9/total8)*100) + "%</b>  ");';
                html += 'if(((total4/total3)*100)<80){$("#pvn").css("background-color", "red");}else if(((total4/total3)*100)>=80 && ((total4/total3)*100)<95){$("#pvn").css("background-color", "yellow");}else{$("#pvn").css("background-color", "#00FF2A");}';
                html += 'if(((total9/total8)*100)<80){$("#pu").css("background-color", "red");}else if(((total9/total8)*100)>=80 && ((total9/total8)*100)<95){$("#pu").css("background-color", "yellow");}else{$("#pu").css("background-color", "#00FF2A");}';
                html += '	},';
                html += '	"buttons": ["excel"],';
                html += '	"dom":"lBfitip"';
            }
            html += '	}';
            html += ');';
            /*html += '$( "#min" ).on( "change", function() {';
            html += '	DataTable.ext.search.push(function (settings, data, dataIndex) {';
            html += '	min = $("#min").val();';
            html += '	max = parseFloat(minDate)+parseFloat(0.9);';
            html += '	let date = new Date(data[4]);';
             
            html += '	if (';
            html += '		(min === null && max === null) ||';
            html += '		(min === null && date <= max) ||';
            html += '		(min <= date && max === null) ||';
            html += '		(min <= date && date <= max)';
            html += '	) {';
            html += '		return true;';
            html += '	}';
            html += '		return false;';
            html += '});';
            html += '	minDate = $("#min").val();';
            html += '	maxDate = parseFloat(minDate)+parseFloat(0.9);';
            html += '	console.log(minDate);';
            html += '	console.log(maxDate);';
            html += '	document.querySelectorAll("minDate, maxDate").forEach((el) => {';
            html += '		el.addEventListener("change", () => table.draw());';
            html += '	});';
            html += '  } );';*/


            html += '</script>';
            return html;
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
        function modificarMes(fechaOrigen, meses) {
            const fecha = new Date(fechaOrigen); //¡se hace esto para no modificar la fecha original!
            const mes = fecha.getMonth();
            fecha.setMonth(fecha.getMonth() + meses);
            while (fecha.getMonth() === mes) {
                fecha.setDate(fecha.getDate() - 1);
            }
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
        return { onRequest }

    });
