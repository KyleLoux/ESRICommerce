package esri.commerce.esri.core.models;

import org.json.JSONObject;

public class Product {

	private String description = "";
	private String display_name = "";
	private String effective_date = "";
	private String end_date = "";
	private String entity_key = "";
	private String amountDistiOwesEsri = "";
	private String distributorSKU = "";
	private String esriProductType = "";
	private String longDescription = "";
	private String priceControl = "";
	private String pricingRequired = "";
	private String shortDescription = "";
	private String storeUnitPrice = "";
	private String storeListUnitPrice = "";
	private String esriListUnitPrice = "";
		
	public Product(JSONObject json) {
		this.setEsriListUnitPrice(json.has("esriListUnitPrice") ? json.getString("esriListUnitPrice") : "");
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getShortDescription() {
		return shortDescription;
	}
	public void setShortDescription(String shortDescription) {
		this.shortDescription = shortDescription;
	}
	public String getDisplayName() {
		return display_name;
	}
	public void setDisplayName(String display_name) {
		this.display_name = display_name;
	}
	public String getEffectiveDate() {
		return effective_date;
	}
	public void setEffectiveDate(String effective_date) {
		this.effective_date = effective_date;
	}
	public String getEndDate() {
		return end_date;
	}
	public void setEndDate(String end_date) {
		this.end_date = end_date;
	}
	public String getEntityKey() {
		return entity_key;
	}
	public void setEntityKey(String entity_key) {
		this.entity_key = entity_key;
	}
	public String getAmountDistiOwesEsri() {
		return amountDistiOwesEsri;
	}
	public void setAmountDistiOwesEsri(String amountDistiOwesEsri) {
		this.amountDistiOwesEsri = amountDistiOwesEsri;
	}
	public String getDistributorSKU() {
		return distributorSKU;
	}
	public void setDistributorSKU(String distributorSKU) {
		this.distributorSKU = distributorSKU;
	}
	public String getEsriProductType() {
		return esriProductType;
	}
	public void setEsriProductType(String esriProductType) {
		this.esriProductType = esriProductType;
	}
	public String getLongDescription() {
		return longDescription;
	}
	public void setLongDescription(String longDescription) {
		this.longDescription = longDescription;
	}
	public String getPriceControl() {
		return priceControl;
	}
	public void setPriceControl(String priceControl) {
		this.priceControl = priceControl;
	}
	public String getPricingRequired() {
		return pricingRequired;
	}
	public void setPricingRequired(String pricingRequired) {
		this.pricingRequired = pricingRequired;
	}
	public String getStoreUnitPrice() {
		return storeUnitPrice;
	}
	public void setStoreUnitPrice(String storeUnitPrice) {
		this.storeUnitPrice = storeUnitPrice;
	}
	public String getStoreListUnitPrice() {
		return storeListUnitPrice;
	}
	public void setStoreListUnitPrice(String storeListUnitPrice) {
		this.storeListUnitPrice = storeListUnitPrice;
	}
	public String getEsriListUnitPrice() {
		return esriListUnitPrice;
	}
	public void setEsriListUnitPrice(String esriListUnitPrice) {
		this.esriListUnitPrice = esriListUnitPrice;
	}

}
