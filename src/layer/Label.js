L.Label = L.Popup.extend({
	options: {
		autoPan: false,
		className: '',
		closePopupOnClick: false,
		offset: new L.Point(20, -15)
	},

	onAdd: function (map) {
		// Hack: turn off popup close
		map.options.closePopupOnClick = false;
		L.Popup.prototype.onAdd.call(this, map);
		map.options.closePopupOnClick = false;
	},

	_close: function () {
		var map = this._map;

		if (map) {
			map._label = null;

			map.removeLayer(this);
		}
	},

	_initLayout: function () {
		this._container = L.DomUtil.create('div', 'leaflet-label ' + this.options.className + ' leaflet-zoom-animated');
	},

	_updateContent: function () {
		if (!this._content) { return; }

		if (typeof this._content === 'string') {
			this._container.innerHTML = this._content;
		}
	},

	_updateLayout: function () {
		// Do nothing
	},

	_updatePosition: function () {
		var pos = this._map.latLngToLayerPoint(this._latlng),
			offset = this.options.offset;

		pos = pos.add(this.options.offset);

		L.DomUtil.setPosition(this._container, pos);
	}
});