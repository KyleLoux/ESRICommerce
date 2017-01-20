package esri.commerce.esri.core.models;

import com.adobe.cq.commerce.api.*;
import com.adobe.cq.commerce.api.Product;
import com.day.cq.commons.ImageResource;
import com.day.cq.wcm.api.Page;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Locale;

/**
 * Created by josephg on 1/13/17.
 */
public class EsriProduct {
    private static final Logger log = LoggerFactory.getLogger(EsriProduct.class);

    private com.adobe.cq.commerce.api.Product product;
    private Page page;

    public EsriProduct() {
        product = null;
        page = null;
    }

    public EsriProduct(Product product, Page page) {
        this.product = product;
        this.page = page;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
    public Product getProduct() {
        return this.product;
    }
    public String getTitle() {
        return getProperty("jcr:title");
    }
    public String getSKU() { return product.getSKU(); }
    //Should add: getPath(), getPagePath(), getSKU()

    public ImageResource getImage() {
        //Modify this to get locale-specific image details
        return product.getImage();
    }
    public Iterator<EsriProduct> getVariants(Page currentPage) throws CommerceException{
        Iterator<Product> variants = product.getVariants();
        ArrayList<EsriProduct> esriVariants = new ArrayList<EsriProduct>();
        while (variants.hasNext()) {
            Product variant = variants.next();
            esriVariants.add(new EsriProduct(variant,currentPage));
        }
        return esriVariants.iterator();
    }

    public String getProperty(String propName) {
        //This method assumes string if no class-based parameters are required
        //Working prototype code, remove later if there are no issues
        /*Locale locale = page.getLanguage(false);
        if (!locale.getLanguage().equals("en")) {
            //If the page is not under the en locale, try to assess it further
            //Start with full locale, then scale back to less specific locales until done
            ValueMap props = product.adaptTo(ValueMap.class);
            StringBuilder localizedProp = new StringBuilder(propName).append(".").append(locale.getLanguage());

            String languagePropName = localizedProp.toString();
            String countryPropName = localizedProp.append("-").append(locale.getCountry()).toString();

            //Try to get the exact country key (e.g. en-US)
            if (props.containsKey(countryPropName)) {
                return product.getProperty(countryPropName, String.class);
            }
            //If not available, fall back to the language key (e.g. en)
            if (props.containsKey(languagePropName)) {
                return product.getProperty(languagePropName, String.class);
            }
            //If not available, default to the base value (no locale information)
            else {
                //Default to the regular (usually english) prop name
                return product.getProperty(propName, String.class);
            }
        }
        //If the locale contained english as the language, just return the prop directly
        return product.getProperty(propName, String.class);*/
        return getProperty(propName, String.class);
    }

    public <T> T getProperty(String propName, Class<T> aClass) {
        Locale locale = page.getLanguage(false);
        if (!locale.getLanguage().equals("en")) {
            //If the page is not under the en locale, try to assess it further
            //Start with full locale, then scale back to less specific locales until done
            ValueMap props = product.adaptTo(ValueMap.class);
            StringBuilder localizedProp = new StringBuilder(propName).append(".").append(locale.getLanguage());

            String languagePropName = localizedProp.toString();
            String countryPropName = localizedProp.append("-").append(locale.getCountry()).toString();

            //Try to get the exact country key (e.g. en-US)
            if (props.containsKey(countryPropName)) {
                return product.getProperty(countryPropName, aClass);
            }
            //If not available, fall back to the language key (e.g. en)
            if (props.containsKey(languagePropName)) {
                return product.getProperty(languagePropName, aClass);
            }
            //If not available, default to the base value (no locale information)
            else {
                //Default to the regular (usually english) prop name
                return product.getProperty(propName, aClass);
            }
        }
        //If the locale contained english as the language, just return the prop directly
        return product.getProperty(propName, aClass);
    }
}
