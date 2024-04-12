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
  var location        = context.request.method == 'POST' ? context.request.parameters.custpage_loc : "";
  var articulo        = context.request.method == 'POST' ? context.request.parameters.custpage_item.split(delimiter) : "";
  
              var f_Inicio     = context.request.method == 'POST' ? context.request.parameters.custpage_field_inicio : fechaHoy();
      var f_Final       = context.request.method == 'POST' ? context.request.parameters.custpage_field_final : fechaHoy();
      var customrecord687 = context.request.method == 'POST' ? context.request.parameters.custpage_selectfieldmes : "";
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
        title: 'Historial de venta por Proveedor',
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
    
        
     var item1 = form.addField({
      id: "custpage_item",
      type: serverWidget.FieldType.SELECT,
      label: "Proveedor",
      source: "CUSTOMRECORD671",
      container: 'grupofiltros'
    }).setHelpText({ help: "Obtener El marca" });
    item1.isMandatory = false;
    item1.defaultValue = articulo;
  
      var location11 = form.addField({
        id: "custpage_loc",
        type: serverWidget.FieldType.SELECT,
        label: "Sucursal",
        source: "location",
        container: 'grupofiltros'
      }).setHelpText({ help: "Obtener El marca" });
      location11.isMandatory = false;
      location11.defaultValue = location;
  
  
      
  
      var selectField = form.addField({
        id : 'custpage_selectfieldmes',
        type : serverWidget.FieldType.SELECT,
        container: 'grupofiltros',
        label : 'calculo por :'
      });
  
     
       selectField.addSelectOption({
        value : 1,
        text : 'Personalizado'
      });
      
      selectField.addSelectOption({
        value : 2,
        text : 'mensual'
      });
       
      selectField.addSelectOption({
        value : 3,
        text : 'trimestre'
      });
       selectField.addSelectOption({
        value : 4,
        text : 'semestre'
      });
       selectField.addSelectOption({
        value : 5,
        text : 'Año'
      });
    
      selectField.isMandatory = true;
      selectField.defaultValue = customrecord687;
  
      
  
  
  /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 04/07/2023-----------------------*/
  
  
  
  
  
  
  /*-------------------Nuevos Filtros Omar Alejandro Hidalgo Diaz 04/07/2023-----------------------*/
  
  
  
  
  
      if (context.request.method == 'POST') {
  
       
      innerHtml = "";
  
      var coluna=""
  
      
            ventadias=  "SUM( "+
                " CASE WHEN "+
                "   1 = 1 "+
                "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
                "   AND N1.trandate >= TO_DATE('"+fecha +"', 'MM/DD/YYYY') "+
                "   AND N1.trandate <= TO_DATE('"+fecha2 +"', 'MM/DD/YYYY') "+
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
                "   AND N1.trandate >= TO_DATE('"+fecha +"', 'MM/DD/YYYY') "+
                "   AND N1.trandate <= TO_DATE('"+fecha2 +"', 'MM/DD/YYYY') "+
                " THEN N1.stock * -1 "+
                " ELSE 0 "+
                " END)/"+Math.round(valor_dedia)+" ,2) AS "+
                " dias_inventario, "+
                " ";
      
      
            vtas_x_dia=  "ROUND(SUM( "+
                " CASE WHEN "+
                "   1 = 1 "+
                "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
                "   AND N1.trandate >= TO_DATE('"+fecha +"', 'MM/DD/YYYY') "+
                "   AND N1.trandate <= TO_DATE('"+fecha2 +"', 'MM/DD/YYYY') "+
                " THEN N1.stock * -1 "+
                " ELSE 0 "+
                " END)/"+Math.round(valor_dedia)+" ) AS "+
                " vtas_x_dia, "+
                " ";
      
      
            vdt22=  "  (ROUND(N1.stockDisponible)   /ROUND(SUM( "+
                " CASE WHEN "+
                "   1 = 1 "+
                "   AND N1.type IN( 'CustInvc', 'CustCred' ) "+
                "   AND N1.trandate >= TO_DATE('"+fecha +"', 'MM/DD/YYYY') "+
                "   AND N1.trandate <= TO_DATE('"+fecha2 +"', 'MM/DD/YYYY') "+
                " THEN N1.stock * -1 "+
                " ELSE 0 "+
                " END)/"+Math.round(valor_dedia)+")) AS "+
                " vdt22, "+
                " ";
      
             
      
      //, ROUND((COALESCE(costo_promedio/NULLIF(total_Ingresos,0),0)-1)*-100) porcentual
            /** SQL principal */
        
            if(location==""){
              location="2,4,5,6,1,3,23";
            }
          
           var restado 
           if(mes_ini==1){
            restado==15.43
           }
           if(mes_ini==2){
            restado==0
           }
  var nuevo_mes=0;
  var nuevo_anio=0;
  var aniofull="";
  if(mes_ini==1){ 
    aniofull='10/01/2023';
  
  }
  else if(mes_ini==2){ 
    aniofull='11/01/2023';
  
  }
  else if(mes_ini==3){ 
  aniofull='12/01/2023';
  
  
  } else{ nuevo_mes =mes_ini-3;  nuevo_anio=anio_ini;}
            //custrecord228 venta onjetivo
            var fecha_dia = dias_TranscurridosDelmes(mes_ini,dia)
            var dias_habiles_Del_mes = dias_Habiles_del_mes(mes_ini)
            utilidad_objetivo_dia = (utilidad_objetivo / Math.round(dias_habiles_Del_mes)) * Math.round(fecha_dia)
            var dia_int=Math.round(fecha_dia)
            var habiles_int=Math.round(dias_habiles_Del_mes);
            //utilidad_objetivo	custrecord229	
   // margen_objetivo	custrecord230
  
  var fecha=""
  var fecha2=""
  var fechavalor_mes=0;
  var fechavalor_mes_trim=0;
  var fechavalor_mes_sem=0;
  var anio_inicio=0;
  if(mes_ini==1){
      fechavalor_mes=12;
      anio_inicio=2023;
  }
  else{fechavalor_mes=mes_ini-1; anio_inicio=2024;}
  
  
  
  if(mes_ini==1){
      fechavalor_mes_trim=10;
      anio_inicio=2023;
  }
  else if(mes_ini==2){
      fechavalor_mes_trim=11;
      anio_inicio=2023;
      
  }
  else if(mes_ini==3){
      fechavalor_mes_trim=12;
      anio_inicio=2023;
  }else{fechavalor_mes_trim=mes_ini-3; anio_inicio=2024;}
  
  
  
  
  
  
  
   if(mes_ini==1){
      fechavalor_mes_sem=7;
      anio_inicio=2023;
  }
  else if(mes_ini==2){
      fechavalor_mes_sem=8;
      anio_inicio=2023;
  }
  else if(mes_ini==3){
      fechavalor_mes_sem=9;
      anio_inicio=2023;
  }
  else if(mes_ini==4){
      fechavalor_mes_sem=10;
      anio_inicio=2023;
  }
  else if(mes_ini==5){
  
      fechavalor_mes_sem=11;
      anio_inicio=2023;
  }
  else if(mes_ini==6){
    
      fechavalor_mes_sem=12;
      anio_inicio=2023;
  }
  else{
        fechavalor_mes_sem=mes_ini-6 ;anio_inicio=2024;;
      
  }
  
  
  var sqlPrincipal= "";
  
  
  
  fecha=mes_ini+"/"+dia_ini+"/"+ anio_ini;  fecha2=mes+"/"+dia+"/"+ anio;  
  if(customrecord687==1){
	var sqlPrincipal = "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '0' MES, round(2024) AÑO  from(SELECT'"+articulo+"' Proveedor, \
	t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
			 (\
				 SELECT \
					 item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
	   SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
				 FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
	  inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
			 ) t1 LEFT JOIN(\
				 SELECT\
					 t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
		 (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
				 FROM(\
					 SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
		SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
		SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
		 INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
		  itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
		   ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
		  ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
				 )t1 FULL OUTER JOIN\
				 (\
					 SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
		SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
		SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
		SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
		SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
		 AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
		  (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) AND\
		   ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
		  ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
				 )t2 ON t1.itemid=t2.itemid\
			 )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor";
      }
      if(customrecord687==2){
        var sqlPrincipal = "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '0' MES, round(2024) AÑO  from(SELECT'"+articulo+"' Proveedor, \
	t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
			 (\
				 SELECT \
					 item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
	   SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
				 FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
	  inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
			 ) t1 LEFT JOIN(\
				 SELECT\
					 t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
		 (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
				 FROM(\
					 SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
		SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
		SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
		 INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
		  itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
		   ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
		  ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
				 )t1 FULL OUTER JOIN\
				 (\
					 SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
		SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
		SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
		SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
		SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
		 AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
		  (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) AND\
		   ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
		  ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
				 )t2 ON t1.itemid=t2.itemid\
			 )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor union all "+
       "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '3' MES, round(2024) AÑO  from(SELECT'"+articulo+"' Proveedor, \
t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
		 (\
			 SELECT \
				 item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
   SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
			 FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
  inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
		 ) t1 LEFT JOIN(\
			 SELECT\
				 t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
	 (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
			 FROM(\
				 SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
	SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
	SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
	 INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
	  itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
	   ( SalesOrder.TranDate >=TO_DATE('03/01/2024', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('03/31/2024', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
	  ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
			 )t1 FULL OUTER JOIN\
			 (\
				 SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
	SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
	SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
	SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
	SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
	 AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
	  (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('03/01/2024', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('03/31/2024', 'MM/DD/YYYY') ) AND\
	   ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
	  ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
			 )t2 ON t1.itemid=t2.itemid\
		 )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor"; 
     
      }
      if(customrecord687==3){
        var sqlPrincipal = "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '0' MES, round(2024) AÑO  from(SELECT'"+articulo+"' Proveedor, \
        t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
             (\
               SELECT \
                 item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
           SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
               FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
          inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
             ) t1 LEFT JOIN(\
               SELECT\
                 t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
           (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
               FROM(\
                 SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
          SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
          SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
           INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
            itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
             ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
            ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
               )t1 FULL OUTER JOIN\
               (\
                 SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
          SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
          SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
          SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
          SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
           AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
            (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) AND\
             ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
            ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
               )t2 ON t1.itemid=t2.itemid\
             )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor union all "+
             "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '3' MES, round(2024) AÑO  from(SELECT'"+articulo+"' Proveedor, \
      t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
           (\
             SELECT \
               item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
         SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
             FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
        inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
           ) t1 LEFT JOIN(\
             SELECT\
               t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
         (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
             FROM(\
               SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
        SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
        SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
         INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
          itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
           ( SalesOrder.TranDate >=TO_DATE('03/01/2024', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('03/31/2024', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
          ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
             )t1 FULL OUTER JOIN\
             (\
               SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
        SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
        SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
        SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
        SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
         AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
          (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('03/01/2024', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('03/31/2024', 'MM/DD/YYYY') ) AND\
           ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
          ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
             )t2 ON t1.itemid=t2.itemid\
           )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor union all "+
           
           "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '2' MES, round(2024) AÑO  from(SELECT'"+articulo+"' Proveedor, \
           t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
                (\
                  SELECT \
                    item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
              SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
                  FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
             inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
                ) t1 LEFT JOIN(\
                  SELECT\
                    t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
              (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
                  FROM(\
                    SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
             SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
             SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
              INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
               itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
                ( SalesOrder.TranDate >=TO_DATE('02/01/2024', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('02/29/2024', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
               ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
                  )t1 FULL OUTER JOIN\
                  (\
                    SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
             SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
             SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
             SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
             SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
              AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
               (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('02/01/2024', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('02/29/2024', 'MM/DD/YYYY') ) AND\
                ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
               ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
                  )t2 ON t1.itemid=t2.itemid\
                )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor  union all "+
                
             "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '1' MES, round(2024) AÑO  from(SELECT'"+articulo+"' Proveedor, \
             t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
                  (\
                    SELECT \
                      item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
                SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
                    FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
               inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
                  ) t1 LEFT JOIN(\
                    SELECT\
                      t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
                (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
                    FROM(\
                      SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
               SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
                INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
                 itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
                  ( SalesOrder.TranDate >=TO_DATE('01/01/2024', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('01/31/2024', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
                 ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
                    )t1 FULL OUTER JOIN\
                    (\
                      SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
                AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
                 (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('01/01/2024', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('01/31/2024', 'MM/DD/YYYY') ) AND\
                  ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
                 ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
                    )t2 ON t1.itemid=t2.itemid\
                  )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor "
           
      }
      if(customrecord687==4){

        var sqlPrincipal = "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '0' MES, round(2024) AÑO  from(SELECT'"+articulo+"' Proveedor, \
        t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
             (\
               SELECT \
                 item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
           SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
               FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
          inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
             ) t1 LEFT JOIN(\
               SELECT\
                 t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
           (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
               FROM(\
                 SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
          SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
          SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
           INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
            itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
             ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
            ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
               )t1 FULL OUTER JOIN\
               (\
                 SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
          SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
          SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
          SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
          SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
           AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
            (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) AND\
             ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
            ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
               )t2 ON t1.itemid=t2.itemid\
             )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor union all "+
             "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '3' MES, round(2024) AÑO  from(SELECT'"+articulo+"' Proveedor, \
      t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
           (\
             SELECT \
               item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
         SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
             FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
        inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
           ) t1 LEFT JOIN(\
             SELECT\
               t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
         (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
             FROM(\
               SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
        SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
        SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
         INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
          itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
           ( SalesOrder.TranDate >=TO_DATE('03/01/2024', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('03/31/2024', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
          ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
             )t1 FULL OUTER JOIN\
             (\
               SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
        SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
        SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
        SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
        SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
         AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
          (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('03/01/2024', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('03/31/2024', 'MM/DD/YYYY') ) AND\
           ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
          ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
             )t2 ON t1.itemid=t2.itemid\
           )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor union all "+
           
           "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '2' MES, round(2024) AÑO  from(SELECT'"+articulo+"' Proveedor, \
           t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
                (\
                  SELECT \
                    item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
              SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
                  FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
             inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
                ) t1 LEFT JOIN(\
                  SELECT\
                    t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
              (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
                  FROM(\
                    SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
             SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
             SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
              INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
               itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
                ( SalesOrder.TranDate >=TO_DATE('02/01/2024', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('02/29/2024', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
               ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
                  )t1 FULL OUTER JOIN\
                  (\
                    SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
             SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
             SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
             SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
             SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
              AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
               (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('02/01/2024', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('02/29/2024', 'MM/DD/YYYY') ) AND\
                ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
               ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
                  )t2 ON t1.itemid=t2.itemid\
                )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor  union all "+
                
             "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '1' MES, round(2024) AÑO  from(SELECT'"+articulo+"' Proveedor, \
             t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
                  (\
                    SELECT \
                      item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
                SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
                    FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
               inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
                  ) t1 LEFT JOIN(\
                    SELECT\
                      t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
                (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
                    FROM(\
                      SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
               SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
                INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
                 itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
                  ( SalesOrder.TranDate >=TO_DATE('01/01/2024', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('01/31/2024', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
                 ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
                    )t1 FULL OUTER JOIN\
                    (\
                      SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
                AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
                 (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('01/01/2024', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('01/31/2024', 'MM/DD/YYYY') ) AND\
                  ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
                 ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
                    )t2 ON t1.itemid=t2.itemid\
                  )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor  union all "+
                  "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '12' MES, round(2023) AÑO  from(SELECT'"+articulo+"' Proveedor, \
                  t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
                       (\
                         SELECT \
                           item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
                     SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
                         FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
                    inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
                       ) t1 LEFT JOIN(\
                         SELECT\
                           t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
                     (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
                         FROM(\
                           SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
                    SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
                    SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
                     INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
                      itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
                       ( SalesOrder.TranDate >=TO_DATE('12/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('12/31/2023', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
                      ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
                         )t1 FULL OUTER JOIN\
                         (\
                           SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
                    SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
                    SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
                    SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
                    SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
                     AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
                      (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('12/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('12/31/2023', 'MM/DD/YYYY') ) AND\
                       ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
                      ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
                         )t2 ON t1.itemid=t2.itemid\
                       )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor union all  "+
                       
             "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '11' MES, round(2023) AÑO  from(SELECT'"+articulo+"' Proveedor, \
             t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
                  (\
                    SELECT \
                      item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
                SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
                    FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
               inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
                  ) t1 LEFT JOIN(\
                    SELECT\
                      t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
                (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
                    FROM(\
                      SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
               SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
                INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
                 itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
                  ( SalesOrder.TranDate >=TO_DATE('11/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('11/30/2023', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
                 ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
                    )t1 FULL OUTER JOIN\
                    (\
                      SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
                AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
                 (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('11/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('11/30/2023', 'MM/DD/YYYY') ) AND\
                  ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
                 ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
                    )t2 ON t1.itemid=t2.itemid\
                  )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor union all  "+
                  "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '10' MES, round(2023) AÑO  from(SELECT'"+articulo+"' Proveedor, \
                  t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
                       (\
                         SELECT \
                           item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
                     SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
                         FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
                    inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
                       ) t1 LEFT JOIN(\
                         SELECT\
                           t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
                     (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
                         FROM(\
                           SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
                    SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
                    SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
                     INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
                      itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
                       ( SalesOrder.TranDate >=TO_DATE('10/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('10/31/2023', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
                      ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
                         )t1 FULL OUTER JOIN\
                         (\
                           SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
                    SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
                    SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
                    SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
                    SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
                     AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
                      (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('10/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('10/31/2023', 'MM/DD/YYYY') ) AND\
                       ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
                      ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
                         )t2 ON t1.itemid=t2.itemid\
                       )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor "
       
      }
      if(customrecord687==5){
        var sqlPrincipal = "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '0' MES, round(2024) AÑO  from(SELECT'"+articulo+"' Proveedor, \
        t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
             (\
               SELECT \
                 item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
           SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
               FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
          inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
             ) t1 LEFT JOIN(\
               SELECT\
                 t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
           (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
               FROM(\
                 SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
          SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
          SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
           INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
            itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
             ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
            ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
               )t1 FULL OUTER JOIN\
               (\
                 SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
          SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
          SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
          SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
          SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
           AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
            (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('"+mes_ini+"/"+dia_ini+"/"+ anio_ini +"', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('"+mes+"/"+dia+"/"+ anio +"', 'MM/DD/YYYY') ) AND\
             ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
            ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
               )t2 ON t1.itemid=t2.itemid\
             )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor union all "+
             "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '3' MES, round(2024) AÑO  from(SELECT'"+articulo+"' Proveedor, \
      t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
           (\
             SELECT \
               item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
         SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
             FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
        inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
           ) t1 LEFT JOIN(\
             SELECT\
               t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
         (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
             FROM(\
               SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
        SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
        SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
         INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
          itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
           ( SalesOrder.TranDate >=TO_DATE('03/01/2024', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('03/31/2024', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
          ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
             )t1 FULL OUTER JOIN\
             (\
               SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
        SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
        SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
        SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
        SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
         AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
          (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('03/01/2024', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('03/31/2024', 'MM/DD/YYYY') ) AND\
           ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
          ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
             )t2 ON t1.itemid=t2.itemid\
           )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor union all "+
           
           "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '2' MES, round(2024) AÑO  from(SELECT'"+articulo+"' Proveedor, \
           t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
                (\
                  SELECT \
                    item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
              SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
                  FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
             inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
                ) t1 LEFT JOIN(\
                  SELECT\
                    t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
              (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
                  FROM(\
                    SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
             SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
             SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
              INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
               itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
                ( SalesOrder.TranDate >=TO_DATE('02/01/2024', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('02/29/2024', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
               ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
                  )t1 FULL OUTER JOIN\
                  (\
                    SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
             SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
             SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
             SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
             SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
              AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
               (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('02/01/2024', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('02/29/2024', 'MM/DD/YYYY') ) AND\
                ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
               ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
                  )t2 ON t1.itemid=t2.itemid\
                )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor  union all "+
                
             "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '1' MES, round(2024) AÑO  from(SELECT'"+articulo+"' Proveedor, \
             t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
                  (\
                    SELECT \
                      item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
                SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
                    FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
               inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
                  ) t1 LEFT JOIN(\
                    SELECT\
                      t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
                (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
                    FROM(\
                      SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
               SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
                INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
                 itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
                  ( SalesOrder.TranDate >=TO_DATE('01/01/2024', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('01/31/2024', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
                 ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
                    )t1 FULL OUTER JOIN\
                    (\
                      SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
                AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
                 (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('01/01/2024', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('01/31/2024', 'MM/DD/YYYY') ) AND\
                  ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
                 ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
                    )t2 ON t1.itemid=t2.itemid\
                  )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor  union all "+
                  "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '12' MES, round(2023) AÑO  from(SELECT'"+articulo+"' Proveedor, \
                  t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
                       (\
                         SELECT \
                           item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
                     SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
                         FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
                    inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
                       ) t1 LEFT JOIN(\
                         SELECT\
                           t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
                     (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
                         FROM(\
                           SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
                    SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
                    SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
                     INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
                      itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
                       ( SalesOrder.TranDate >=TO_DATE('12/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('12/31/2023', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
                      ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
                         )t1 FULL OUTER JOIN\
                         (\
                           SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
                    SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
                    SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
                    SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
                    SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
                     AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
                      (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('12/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('12/31/2023', 'MM/DD/YYYY') ) AND\
                       ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
                      ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
                         )t2 ON t1.itemid=t2.itemid\
                       )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor union all  "+
                       
             "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '11' MES, round(2023) AÑO  from(SELECT'"+articulo+"' Proveedor, \
             t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
                  (\
                    SELECT \
                      item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
                SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
                    FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
               inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
                  ) t1 LEFT JOIN(\
                    SELECT\
                      t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
                (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
                    FROM(\
                      SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
               SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
                INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
                 itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
                  ( SalesOrder.TranDate >=TO_DATE('11/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('11/30/2023', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
                 ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
                    )t1 FULL OUTER JOIN\
                    (\
                      SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
                AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
                 (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('11/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('11/30/2023', 'MM/DD/YYYY') ) AND\
                  ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
                 ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
                    )t2 ON t1.itemid=t2.itemid\
                  )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor union all  "+
                  "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '10' MES, round(2023) AÑO  from(SELECT'"+articulo+"' Proveedor, \
                  t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
                       (\
                         SELECT \
                           item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
                     SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
                         FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
                    inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
                       ) t1 LEFT JOIN(\
                         SELECT\
                           t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
                     (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
                         FROM(\
                           SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
                    SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
                    SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
                     INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
                      itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
                       ( SalesOrder.TranDate >=TO_DATE('10/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('10/31/2023', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
                      ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
                         )t1 FULL OUTER JOIN\
                         (\
                           SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
                    SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
                    SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
                    SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
                    SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
                     AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
                      (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('10/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('10/31/2023', 'MM/DD/YYYY') ) AND\
                       ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
                      ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
                         )t2 ON t1.itemid=t2.itemid\
                       )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor union all "+
                       

                       
             "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '9' MES, round(2023) AÑO  from(SELECT'"+articulo+"' Proveedor, \
             t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
                  (\
                    SELECT \
                      item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
                SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
                    FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
               inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
                  ) t1 LEFT JOIN(\
                    SELECT\
                      t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
                (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
                    FROM(\
                      SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
               SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
                INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
                 itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
                  ( SalesOrder.TranDate >=TO_DATE('09/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('09/30/2023', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
                 ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
                    )t1 FULL OUTER JOIN\
                    (\
                      SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
                AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
                 (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('09/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('09/30/2023', 'MM/DD/YYYY') ) AND\
                  ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
                 ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
                    )t2 ON t1.itemid=t2.itemid\
                  )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor union all "+
                  
             "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '8' MES, round(2023) AÑO  from(SELECT'"+articulo+"' Proveedor, \
             t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
                  (\
                    SELECT \
                      item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
                SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
                    FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
               inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
                  ) t1 LEFT JOIN(\
                    SELECT\
                      t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
                (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
                    FROM(\
                      SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
               SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
                INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
                 itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
                  ( SalesOrder.TranDate >=TO_DATE('08/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('08/31/2023', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
                 ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
                    )t1 FULL OUTER JOIN\
                    (\
                      SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
                AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
                 (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('08/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('08/31/2023', 'MM/DD/YYYY') ) AND\
                  ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
                 ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
                    )t2 ON t1.itemid=t2.itemid\
                  )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor union all "+
                  
             "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '7' MES, round(2023) AÑO  from(SELECT'"+articulo+"' Proveedor, \
             t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
                  (\
                    SELECT \
                      item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
                SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
                    FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
               inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
                  ) t1 LEFT JOIN(\
                    SELECT\
                      t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
                (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
                    FROM(\
                      SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
               SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
                INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
                 itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
                  ( SalesOrder.TranDate >=TO_DATE('07/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('07/31/2023', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
                 ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
                    )t1 FULL OUTER JOIN\
                    (\
                      SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
                AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
                 (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('07/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('07/31/2023', 'MM/DD/YYYY') ) AND\
                  ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
                 ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
                    )t2 ON t1.itemid=t2.itemid\
                  )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor union all " +
                  
             "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '6' MES, round(2023) AÑO  from(SELECT'"+articulo+"' Proveedor, \
             t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
                  (\
                    SELECT \
                      item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
                SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
                    FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
               inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
                  ) t1 LEFT JOIN(\
                    SELECT\
                      t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
                (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
                    FROM(\
                      SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
               SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
                INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
                 itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
                  ( SalesOrder.TranDate >=TO_DATE('06/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('06/30/2023', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
                 ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
                    )t1 FULL OUTER JOIN\
                    (\
                      SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
                AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
                 (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('06/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('06/30/2023', 'MM/DD/YYYY') ) AND\
                  ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
                 ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
                    )t2 ON t1.itemid=t2.itemid\
                  )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor union all "+
                  
             "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '5' MES, round(2023) AÑO  from(SELECT'"+articulo+"' Proveedor, \
             t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
                  (\
                    SELECT \
                      item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
                SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
                    FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
               inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
                  ) t1 LEFT JOIN(\
                    SELECT\
                      t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
                (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
                    FROM(\
                      SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
               SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
                INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
                 itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
                  ( SalesOrder.TranDate >=TO_DATE('05/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('05/31/2023', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
                 ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
                    )t1 FULL OUTER JOIN\
                    (\
                      SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
                AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
                 (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('05/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('05/31/2023', 'MM/DD/YYYY') ) AND\
                  ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
                 ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
                    )t2 ON t1.itemid=t2.itemid\
                  )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor  union all "+
                  
             "select Proveedor Codigo_proveedor,Proveedor cod_proveedor, Round(sum(cantidad_vendida)) cantidad_vendida,sum(venta)venta,sum(utilidad_en_pesos)utilidad_en_pesos, round((sum(utilidad_en_pesos)/sum(venta))*100) utilidad_porcentaje , '4' MES, round(2023) AÑO  from(SELECT'"+articulo+"' Proveedor, \
             t2.cantidad_vendida,venta,utilidad utilidad_en_pesos,round((utilidad/venta)*100) utilidad_porcentaje  FROM\
                  (\
                    SELECT \
                      item.displayname,item.itemid as articulo,SUM( inventoryitemlocations.quantityavailable) as cantidad_disponible,\
                SUM( inventoryitemlocations.quantityavailable*inventoryitemlocations.averagecostmli) as valor_de_stock,CUSTOMRECORD671.name as proveedor\
                    FROM item JOIN inventoryitemlocations ON inventoryitemlocations.item=item.id LEFT JOIN CUSTOMRECORD671 ON item.custitem10 = CUSTOMRECORD671.id WHERE \
               inventoryitemlocations.location IN("+location+") AND item.isInactive='F' AND (item.custitem10='"+articulo+"') GROUP BY item.itemid,CUSTOMRECORD671.name,item.displayname ORDER BY valor_de_stock DESC\
                  ) t1 LEFT JOIN(\
                    SELECT\
                      t1.itemid as articulo,(NVL(venta_neta,0)+NVL(VN,0)+NVL(VNS,0)) as venta,(NVL(utilidad,0)+NVL(VU,0)+NVL(VUS,0)) as utilidad,\
                (NVL(t1.cantidad,0)+NVL(t2.cantidad,0)) as cantidad_vendida\
                    FROM(\
                      SELECT item.itemid,SUM(CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)*-1 as Venta_neta,\
               SUM((CASE WHEN SalesOrder.terms=20 THEN SOLine.netamount WHEN SalesOrder.terms=4 THEN SOLine.netamount ELSE SOLine.netamount *0.95 END)-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2)))*-1 as utilidad,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' )\
                INNER JOIN location AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN\
                 itemLocationConfiguration ON (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type = 'CustInvc'  ) AND\
                  ( SalesOrder.TranDate >=TO_DATE('04/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('04/30/2023', 'MM/DD/YYYY')) AND ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' ) AND\
                 ( Item.ItemType != 'Service' ) AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 )  AND (ubicacion.id IN ("+location+"))  GROUP BY item.itemid \
                    )t1 FULL OUTER JOIN\
                    (\
                      SELECT item.itemid, SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN (SOLine.netamount * -1)ELSE 0 END)  as vn,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=1 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1 )ELSE 0 END) as VU,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN (SOLine.netamount * -1) ELSE 0 END) as vns,\
               SUM(CASE WHEN SalesOrder.custbody_bex_tiponc=3 THEN ((SOLine.netamount-(ROUND(SOLine.quantity,2)*ROUND(SOLine.costEstimateRate,2))) * -1)ELSE 0 END) as VUS,\
               SUM(  SOLine.quantity )*-1 as cantidad FROM Transaction AS SalesOrder INNER JOIN TransactionLine AS SOLine ON ( SOLine.Transaction = SalesOrder.ID ) AND ( SOLine.MainLine = 'F' ) INNER JOIN location\
                AS Ubicacion ON ( SOLine.location= Ubicacion.id ) INNER JOIN Item ON ( Item.ID = SOLine.Item ) LEFT JOIN itemLocationConfiguration ON\
                 (itemLocationConfiguration.item=item.id AND Ubicacion.id=itemLocationConfiguration.location)  WHERE ( SalesOrder.Type ='CustCred') AND ( SalesOrder.TranDate >=TO_DATE('04/01/2023', 'MM/DD/YYYY')   AND SalesOrder.TranDate <=TO_DATE('04/30/2023', 'MM/DD/YYYY') ) AND\
                  ( SalesOrder.Void = 'F' ) AND ( SalesOrder.Voided = 'F' ) AND ( Item.ItemType <> 'Discount' )   AND ( Item.ItemType != 'Assembly' ) AND ( Item.id!=25311 ) AND\
                 ( SalesOrder.custbody_bex_tiponc=1 OR SalesOrder.custbody_bex_tiponc=3) AND (ubicacion.id IN ("+location+")) GROUP BY item.itemid\
                    )t2 ON t1.itemid=t2.itemid\
                  )t2 ON t2.articulo=t1.articulo WHERE (cantidad_disponible!='' OR cantidad_disponible IS NOT NULL)  AND (valor_de_stock!='' OR valor_de_stock IS NOT NULL) ) group by Proveedor "
      }
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
  var fecha_dia = dias_TranscurridosDelmes(mes_ini,dia)
  var dias_habiles_Del_mes = dias_Habiles_del_mes(mes_ini)
  
  innerHtml = "";
  
  
  innerHtml = "";
  
  
  
  
  innerHtml += '<br/><input type="text" id="dd" name="dd" class="form-control" value="Fecha de inicio ' +fecha + '"readonly=""/>   <br/>';
  innerHtml += '<br/><input type="text" id="dd" name="dd" class="form-control" value="Fecha final ' + fecha2 + ' " readonly=""/>   <br/>';
    
  
  
      innerHtml+= ' <br/> <br/><br/> <br/><table style="table-layout: fixed; width: 300%; border-spacing: 6px;">';
      innerHtml+= ' <br/> <br/><br/> <br/><table style="table-layout: fixed; width: 300%; border-spacing: 6px;">';
    
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
   
        innerHtml+= '     <th class="text-right text-uppercase"><H3>Mes</H3></th>';
        innerHtml+= '     <th class="text-right text-uppercase"><H3>Orden</H3></th>';
   
        innerHtml+= '       </tr>';
        innerHtml+= '     </thead>';
        innerHtml+= '     <tbody id="apptable">';
        // Add the records to the sublist...
        for ( r = 0; r < records.length; r++ ) {
  
          var mes =0;
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
      if (column.indexOf("mes") !== -1)
      mes = parseFloat(value)
      
              if (column.indexOf("valor_de_stock") !== -1)
              valor_de_stock = parseFloat(value)
            
              es_numero = c >= 8 && !isNaN(value) ? true : false;
              innerHtml += '    <td class="text-right  ">' + (es_numero ? parseFloat(value).toFixed(2) : value) + '</td>';
            
  
        
          }
  var mes_texto="";
          if(mes==1){mes_texto='ENERO'}
          else if (mes==2){mes_texto='FEBRERO'}
          else if (mes==3){mes_texto='MARZO'}
          else if (mes==4){mes_texto='ABRIL'}
          else if (mes==5){mes_texto='MAYO'}
          else if (mes==6){mes_texto='JUNIO'}
          else if (mes==7){mes_texto='JULIO'}
          else if (mes==8){mes_texto='AGOSTO'}
          else if (mes==9){mes_texto='SEPTIEMBRE'}
          else if (mes==10){mes_texto='OCTUBRE'}
          else if (mes==11){mes_texto='NOVIEMBRE'}
          else if (mes==12){mes_texto='DICIEMBRE'}
          else {mes_texto='ACTUAL'}
  
          var mes_orden="";
          if(mes==1){mes_orden='2'}
          else if (mes==2){mes_orden='2'}
          else if (mes==3){mes_orden='1'}
          else if (mes==4){mes_orden='11'}
          else if (mes==5){mes_orden='10'}
          else if (mes==6){mes_orden='9'}
          else if (mes==7){mes_orden='8'}
          else if (mes==8){mes_orden='7'}
          else if (mes==9){mes_orden='6'}
          else if (mes==10){mes_orden='5'}
          else if (mes==11){mes_orden='4'}
          else if (mes==12){mes_orden='3'}
          else {mes_orden='0'}
          innerHtml += '    <td class="text-right  ">' + mes_texto + '</td>';
           innerHtml += '    <td class="text-right  ">' + mes_orden + '</td>';
    
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
      
  
    function generadorHtml(table, records,f_Inicio ,f_Final,cantidad){
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
        html += '<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script> <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>';
  
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
              html += '   "dom":"lBpftip",';
                          
              // Ordenar desde la columna con índice 3 (0-indexed) de mayor a menor
              html += '   "order": [[9, "asc"]]';
              
              html += ' });';
              
              // Pintar la columna 3 en escala de rojo a verde
        
  
  
  html += ' $("#resultsTable").on("search.dt", function() {';
  html += '      var searchValue = $("#resultsTable_filter input").val();';
  html += '      console.log("Valor del buscador:", searchValue);';
  
  html += '      var data = $("#resultsTable").DataTable().rows({ search: "applied" }).data();';
  html += '          var col1=0;';
  html += '          var col2=0;';
  html += '          var col3=0;';
  
  html += '          var col4=0;';
  html += '          var col5=0;';
  html += '          var col6=0;';
  
  html += '          var col5=0;';
  html += '          var col6=0;';
  html += '          var col7=0;';
  
  html += '          var col8=0;';
  html += '          var col9=0;';
  
  
  
  html += '      data.each(function(value, index) {';
  
  html += '          console.log("Fila " + (index + 1) + ":");';
  
  html += '          for (var prop in value) {';
  html += '  if(prop==1){'
  html += '   var agregar=parseFloat(value[prop]);  if (isNaN(agregar)) {  agregar=0;}       col1+=agregar; '; 
  html += '          } ';
  html += '  else if(prop==2){'
  html += '      var agregar=parseFloat(value[prop]);  if (isNaN(agregar)) {  agregar=0;}            col2+=agregar; '; 
  html += '          }';
  html += '  else if(prop==3){'
  html += '      var agregar=parseFloat(value[prop]);  if (isNaN(agregar)) {  agregar=0;}           col3+=agregar; '; 
  html += '          }';
  html += '  else if(prop==4){'
  html += '      var agregar=parseFloat(value[prop]);  if (isNaN(agregar)) {  agregar=0;}           col4+=agregar; '; 
  html += '          }';
  html += '  else if(prop==5){'
  html += '     var agregar=parseFloat(value[prop]);  if (isNaN(agregar)) {  agregar=0;}            col5+=agregar; '; 
  html += '          }';
  html += '  else if(prop==6){'
  html += '     var agregar=parseFloat(value[prop]);  if (isNaN(agregar)) {  agregar=0;}            col6+=agregar; '; 
  html += '          }';
  html += '  else if(prop==7){'
  html += '   var agregar=parseFloat(value[prop]);  if (isNaN(agregar)) {  agregar=0;}              col7+=agregar; '; 
  html += '          }';
  html += '  else if(prop==8){'
  html += '     var agregar=parseFloat(value[prop]);  if (isNaN(agregar)) {  agregar=0;}            col8+=agregar; '; 
  html += '          }';
  html += '  else if(prop==9){'
  html += '    var agregar=parseFloat(value[prop]);  if (isNaN(agregar)) {  agregar=0;}             col9+=agregar; '; 
  html += '          }';
  html 
  html += '          }';
  html += '    }); ';
  
  html += ' var porcent1 = parseInt(((col4/col3)*100));var porcent2 = parseInt((col7/col6)*100); var margen=parseInt((col7/col3)*100);   ';
  
  html += '  col3 = col3.toLocaleString("en-US", { style: "currency", currency: "USD" });';
  html += '    col4 = col4.toLocaleString("en-US", { style: "currency", currency: "USD" });';
  
  html += '$("#ttf").empty(); $("#ttf").append( `<tr><td  ></td>  <td  class="text-right ">`+parseInt(col2)+` </td>  <td  class="text-right ">`+col3+` </td> <td  class="text-right ">`+col4+` </td>  <td  class="text-right ">`+porcent1+`% </td>  </tr>` ); ';  
  html += '  });'
  
  
  html += '  var indiceColumna = 2; '
  html += '  var indiceColumna5 = 3; '
  html += '  var indiceColumna6 = 4; '
   html += '  var indiceColumna7 = 6; '
  
  html += "      $('#resultsTable tbody tr').each(function(){"
  
  
  html += "     $(this).find('td').eq(3).addClass('precio'); "   
  html += "     $(this).find('td').eq(4).addClass('precio'); "
  html += "     $(this).find('td').eq(5).addClass('porcentaje'); "
  
    /*html += "     $(this).find('td').eq(indiceColumna).addClass('precio'); "
  html += "     $(this).find('td').eq(indiceColumna5).addClass('precio'); "   
  html += "     $(this).find('td').eq(indiceColumna6).addClass('porcentaje'); "*/
  html += '      });  '
  
  
  ////////////////
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    html += "$('#resultsTable .porcentaje').each(function() {"
      html += ' var contenido = $(this).text();' 
      html += "$(this).text(contenido + '%');"
      html += '});'
      html += 'var precios = document.querySelectorAll(".precio");';
      html += ' precios.forEach(function(precio) {';
        html += ' var valor = parseFloat(precio.textContent);';
            html += ' if (isNaN(valor)) { '
           html += '  precio.textContent = precio.textContent;';
             html += ' } else { '
           html += '  precio.textContent = valor.toLocaleString("en-US", { style: "currency", currency: "USD" });';
              html += '} '
              html += '});';
  
  
  
              html += "  var table = document.getElementById('resultsTable');"
  
              // Ocultar la sexta columna (índice 5)
              html += "  var columnIndex = 6;"
              
              // Ocultar el título de la sexta columna
              html += "  var headerCell = table.rows[0].cells[columnIndex];"
              html += "  headerCell.style.display = 'none';"
              
              // Iterar sobre todas las filas de la tabla
              html += "  for (var i = 0; i < table.rows.length; i++) {"
                  // Ocultar la celda correspondiente a la sexta columna
                  html += "    var cell = table.rows[i].cells[columnIndex];"
                  html += "   cell.style.display = 'none';"
                  html += "  }"
                  
  
              html += "  var table = document.getElementById('resultsTable');"
  
              // Ocultar la sexta columna (índice 5)
              html += "  var columnIndex = 9;"
              
              // Ocultar el título de la sexta columna
              html += "  var headerCell = table.rows[0].cells[columnIndex];"
              html += "  headerCell.style.display = 'none';"
              
              // Iterar sobre todas las filas de la tabla
              html += "  for (var i = 0; i < table.rows.length; i++) {"
                  // Ocultar la celda correspondiente a la sexta columna
                  html += "    var cell = table.rows[i].cells[columnIndex];"
                  html += "   cell.style.display = 'none';"
                  html += "  }"
                  html += "  var table = document.getElementById('resultsTable');"
  
                  // Ocultar la sexta columna (índice 5)
                  html += "  var columnIndex = 1;"
                  
                  // Ocultar el título de la sexta columna
                  html += "  var headerCell = table.rows[0].cells[columnIndex];"
                  html += "  headerCell.style.display = 'none';"
                  
                  // Iterar sobre todas las filas de la tabla
                  html += "  for (var i = 0; i < table.rows.length; i++) {"
                      // Ocultar la celda correspondiente a la sexta columna
                      html += "    var cell = table.rows[i].cells[columnIndex];"
                      html += "   cell.style.display = 'none';"
                      html += "  }"
      
  
     
          html += '</script>';
      return html;
    }
  
    function columnasXmeses(anio,mes,dia,mes_ini,dia_ini,anio,anio_ini,log){
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
          campoSuma = 'monto_venta_9_' + anio_anterior;
          campoSumaPza= 'cantidad_venta_9_' + anio_anterior;
          fechaInicio = '09/01/';
          fechaFinal  = '09/30/';
          fhFinal_mes = '08/31/' + anio;
          break;
        case '10':
          campoSuma = 'monto_venta_10_' + anio_anterior;
          campoSumaPza= 'cantidad_venta_10_' + anio_anterior;
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
  
  
      
  
      /** meses con inventario ***/
  
  
  
  
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
  
    
  function dias_Habiles_del_mes(customrecord687) {
    // Obtén la fecha actual
    var fechaActual = new Date();
    var mes_actual = customrecord687
  
  
    // Obtén el primer día del mes actual
    var primerDiaDelmes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
  
    // Obtén el último día del mes actual
    var ultimoDiaDelmes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);
  
    // Inicializa el contador de días sin contar los domingos y días festivos
    var diasSinDomingos = 0;
  
    // Itera sobre cada día del mes
    for (var i = primerDiaDelmes.getDate(); i <= ultimoDiaDelmes.getDate(); i++) {
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
    if(customrecord687==3){  return 22;}
    else{
    return diasSinDomingos;}
  
  
  }
  
  function dias_TranscurridosDelmes(customrecord687,dia) {
    // Obtén la fecha actual
    var fechaActual = new Date();
  
    // Obtén el primer día del mes actual
    var mes_actual = customrecord687;
    var dia_consulta=dia;
    var primerDiaDelmes = new Date(fechaActual.getFullYear(), mes_actual, 1);
  
    // Inicializa el contador de días sin contar domingos y días festivos
    var diasSinDomingos = 0;
  
    // Itera sobre cada día desde el primer día del mes hasta la fecha actual
    for (var i = primerDiaDelmes.getDate(); i <= fechaActual.getDate(); i++) {
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
  
      else if(dia_consulta==5){dia_consulta=4;}
      else if(dia_consulta==4){dia_consulta=3;}
      else if(dia_consulta==3){dia_consulta=2;}
      else if(dia_consulta==2){dia_consulta=2;}
      else if(dia_consulta==1){dia_consulta=1;}
      else {dia_consulta=8;} 
        return dia_consulta;
    }
    else{
    return diasSinDomingos;
    }
  
  }
  
    ///_________crea peudido
  
    function esDiaFestivoAdicional(fecha) {
      var festivosAdicionales = [
        new Date(fecha.getFullYear(), 0, 1), // 1 de enero
        primerLunesDeFebrero(fecha.getFullYear()), // Primer lunes de febrero
        tercerLunesDeMarzo(fecha.getFullYear()), // Tercer lunes de marzo
        new Date(fecha.getFullYear(), 4, 1), // 1 de mayo
        new Date(fecha.getFullYear(), 8, 16), // 16 de 9
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
  