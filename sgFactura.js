/** 
 * factura.js
 *
 * Este archivo contiene las funcionalidades para el modal #modal_nuevo_movimiento
 *
 * @author: Sagitarius
 * @name: Adolfo Cuadros
 * @website: www.adolfocuadros.com
 * @license: (c) Todos los derechos reservados
 *
 */

 //inicializando Plugin

/*(function($){
	var sgFactura = function(element, options) {
	var _obj = this;        // guardamos una referencia de nuestro objeto.
	var _elem = $(element); // elemento del cual se ha llamado a nuesto plugin.
	var _defaults = {};     // nuestros parámetros por defecto.
	var _config;            // Variable de Configuracion

	_config = $.extend(_defaults, options || {}); // combinamos los parámetos que nos pasa el usuario con los de por defecto.
	};

	_change = function(options) {}
	_stop = function() {}

	this._methods = {
	  change: _change,
	  stop: _stop
	};
 
	$.fn.extend({
		sgFactura: function(method) {
			if ($(this).data('sgFactura')) // Si ya se ha instanciado nuestro objeto, 
				return $(this);                 // Salimos

			var sgFactura = new sgFactura(this, method); // Creamos una nueva instancia.

			$(this).data('sgFactura', sgFactura);        // Se la añadimos al objeto de JQuery.
			return $(this);
	});
})(jQuery);*/

(function($){
	$.fn.sgFactura = function(options) {

		var _script_uri = $(document).find('script[src$="sgFactura.js"]').attr('src');
		var _obj = this;
		var _defaults = {
			index_element: 'data-sgfactura-element',
			icon_edit: '<i class="glyphicon glyphicon-pencil btn-xs"></i>',
			icon_delete: '<i class="glyphicon glyphicon-remove-circle btn-xs"></i>',
			btn_more_concept: '.sgfactura-more-concept',
			attr_table_action: 'data-sgfactura-table-action',
			css_default: true,
			prefix_table: 'sgFactura-table_'
		};

		var _config;

		//Pasando datos de configuracion
		_config = $.extend(_defaults, options);

		//Cargando Estilo CSS default
		if (_config.css_default == true)
		{
			if($(document).find('link[name=sgfactura]').length == 0)
			{
				$('head').append(' <link name="sgfactura" href="' + _script_uri.replace('sgFactura.js', '') + 'css/sgFactura.css" rel="stylesheet">');
			}
		}

		//Comprobando si es una tabla
		this.filter('table').each(function(index) {

			// Recorriendo tr
			$(_obj).find('tr').each(function(index) {
				//Si es cabeza
				if (index == 0) {
					$(this).append('<th></th>');
				}
				else
				{
					//Si el elemento esta indexado, sirve para saber cuantos conceptos hay que sumar, etc
					if ($(this).attr(_config.index_element) != null)
					{
						$(this).append('<td>' + _config.icon_edit + _config.icon_delete + '</td>');
					}
					//Los demas elementos
					else
					{
						var total = $(this).find('td').length;

						$(this).find('td').each(function(index) {
							if(index == (total-1))
							{
								$(this).attr('colspan', 2);
							}
						});
						//$(this).attr('colspan','2');
						console.log($(this).find('td').length);
					}
				}
			});

			//Buscando Boton, nuevo Concepto
			$(_obj).find(_config.btn_more_concept).attr(_config.attr_table_action, index);

			//Agregando Clase de accion
			if (_config.css_default == true) {
				$(this).addClass('sgfactura');
			}
			$(this).addClass(_config.prefix_table + index);

			//console.log($(document).find('link[name=sgfactura]').length);
		});

		//Evento al Pulsar Boton +
		$(_config.btn_more_concept).click(function() {
			var table_action = $(this).attr(_config.attr_table_action);
			console.log(table_action);
		});

		// retorno
		return this;
	}
})(jQuery);