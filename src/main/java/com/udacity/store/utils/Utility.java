package com.udacity.store.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.udacity.store.constants.Constants;
import com.udacity.store.model.Product;

import java.nio.file.Paths;

public class Utility {

    public static Product[] getProductsFromFile() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(Paths.get(Constants.PRODUCT_FILE_PATH).toFile(), Product[].class);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

}
