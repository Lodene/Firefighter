package real.models;

public class Vehicle {
    private static int nextId = 1;
    private int id;
    private boolean isBusy;
    private double longitude;
    private double latitude;
    private int gasoline;
    private TypeVehicle typeVehicle;

    public Vehicle(boolean isBusy, double longitude, double latitude, int gasoline, TypeVehicle typeVehicle) {
        this.id = generateUniqueId();
        this.isBusy = isBusy;
        this.longitude = longitude;
        this.latitude = latitude;
        this.gasoline = gasoline;
        this.typeVehicle = typeVehicle;
    }

    // Getter pour id
    public int getId() {
        return id;
    }

    // Getter pour isBusy
    public boolean isBusy() {
        return isBusy;
    }

    // Setter pour isBusy
    public void setBusy(boolean isBusy) {
        this.isBusy = isBusy;
    }

    // Getter pour longitude
    public double getLongitude() {
        return longitude;
    }

    // Setter pour longitude
    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    // Getter pour latitude
    public double getLatitude() {
        return latitude;
    }

    // Setter pour latitude
    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    // Getter pour gasoline
    public int getGasoline() {
        return gasoline;
    }

    // Setter pour gasoline
    public void setGasoline(int gasoline) {
        this.gasoline = gasoline;
    }

    // Getter pour typeVehicle
    public TypeVehicle getTypeVehicle() {
        return typeVehicle;
    }

    // Setter pour typeVehicle
    public void setTypeVehicle(TypeVehicle typeVehicle) {
        this.typeVehicle = typeVehicle;
    }

    // Méthode pour générer un identifiant unique
    private synchronized int generateUniqueId() {
        return nextId++;
    }
}
