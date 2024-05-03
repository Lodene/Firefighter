package real;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import real.service.Api;

import real.models.Actor;
import real.models.Base;
import real.models.TypeActor;
import real.models.TypeBase;
import real.models.TypeVehicle;
import real.models.Vehicle;

public class App {
    private static final String EVENT_API_URL = "http://localhost:3000/api/event";
    private static final String VEHICLE_API_URL = "http://localhost:3000/api/vehicle/free";
    private static final String VEHICLE_ASSIGN_TO_EVENT_API_URL = "http://localhost:3000/api/vehicle/event";
    private static final String SENSOR_NO_EVENT_API_URL = "http://localhost:3000/api/sensor/noevent" ;
    private static final String SENSOR_ALL_API_URL = "http://localhost:3000/api/sensor/all" ;
    private static final String SENSOR_ADD_TO_EVENT_API_URL = "http://localhost:3000/api/sensor/event";
    private static final String EVENT_GIANT_API_URL = "http://localhost:3000/api/event/giant";

    private static final ScheduledExecutorService executorService = Executors.newScheduledThreadPool(4);
    private static final Api api = new Api();

    public static void main(String[] args) throws Exception {
        while(true){
            // Déplacement du camion vers le feu ou vers la base
            String json = api.getList(EVENT_API_URL);
            JSONArray jsonArray = new JSONArray(json);
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                executorService.execute(new ItineraryTruck(jsonObject));
            }
           
            //récupération des feux qui baissent en intensité
            String json = api.getList(SENSOR_NO_EVENT_API_URL);
            JSONArray jsonArray = new JSONArray(json);
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                executorService.execute(new DecreaseIntensity(jsonObject));
            }

            //récupération des feux qui augmentent en intensité
            String json = api.getList(SENSOR_ALL_API_URL);
            JSONArray jsonArray = new JSONArray(json);
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                executorService.execute(new IncreaseIntensity(jsonObject));
            }
        }
    }

    static class ItineraryTruck extends Thread {
        private JSONObject jsonObject;

        public ItineraryTruck(JSONObject jsonObject) {
            this.jsonObject = jsonObject;
        }

        @Override
        public void run() {
            System.out.println(jsonObject);
        }
    }

    static class DecreaseIntensity extends Thread {
        private JSONObject jsonObject;

        public DecreaseIntensity(JSONObject jsonObject) {
            this.jsonObject = jsonObject;
        }

        @Override
        public void run() {
            System.out.println(jsonObject);
            // Code to be executed in the thread
            // You can now use `this.event` to handle event-specific logic
        }
    }

    static class IncreaseIntensity extends Thread {
        private JSONObject jsonObject;

        public IncreaseIntensity(JSONObject jsonObject) {
            this.jsonObject = jsonObject;
        }

        @Override
        public void run() {
            System.out.println(jsonObject);
        }
    }
        
}
