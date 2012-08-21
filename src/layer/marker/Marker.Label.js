/*
 * Label extension to L.Marker, adding showLabel & bindLabel methods.
 */

L.Marker.include({
	showLabel: function () {
		if (this._label && this._map) {
			this._label.setLatLng(this._latlng);
			this._map.showLabel(this._label);
		}

		return this;
	},

	hideLabel: function () {
		if (this._label) {
			this._label._close();
		}
		return this;
	},

	bindLabel: function (content, options) {
		if (!this._label) {
			this
				.on('mouseover', this.showLabel, this)
				.on('mouseout', this.hideLabel, this);
		}

		this._label = new L.Label(options, this)
			.setContent(content);

		return this;
	},

	unbindLabel: function () {
		if (this._label) {
			this._label = null;
			this
				.off('mouseover', this.showLabel)
				.off('mouseout', this.hideLabel);
		}
		return this;
	},

	updateLabelContent: function (content) {
		if (this._label) {
			this._label.setContent(content);
		}
	}
});
