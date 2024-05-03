package real.service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

public class Api {

    protected <T> List<T> getList(String apiUrl, Class<T[]> responseType) {
        try {
            String apiResponse = fetchData(apiUrl, "GET");
            ObjectMapper mapper = new ObjectMapper();
            return Collections.synchronizedList(
                List.of(mapper.readValue(apiResponse, responseType))
            );
        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }

    protected <T> T getSingle(String apiUrl, Class<T> responseType) {
        try {
            String apiResponse = fetchData(apiUrl, "GET");
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(apiResponse, responseType);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    protected <T> T postOrPut(String apiUrl, Object requestBody, Class<T> responseType,String method) {
        try {
            String requestBodyJson = convertObjectToJsonString(requestBody);
            String apiResponse = fetchDataWithBody(apiUrl, method, requestBodyJson);
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(apiResponse, responseType);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private String convertObjectToJsonString(Object object) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(object);
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    private String fetchData(String apiUrl, String method) throws IOException {
        URL url = new URL(apiUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod(method);

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            return response.toString();
        } finally {
            connection.disconnect();
        }
    }

    private String fetchDataWithBody(String apiUrl, String method, String requestBody) throws IOException {
        URL url = new URL(apiUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod(method);
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setDoOutput(true);

        try (OutputStream os = connection.getOutputStream();
             BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(os, "UTF-8"))) {
            writer.write(requestBody);
            writer.flush();
        }

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            return response.toString();
        } finally {
            connection.disconnect();
        }
    }
}