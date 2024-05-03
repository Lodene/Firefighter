package real.models;

public class Base {
    private static int nextId = 1;
    private int id;
    private double longitude;
    private double latitude;
    private TypeBase typebase;

    // Constructeur avec paramètres (sans id)
    public Base(double longitude, double latitude, TypeBase typeBase) {
        this.id = generateUniqueId();
        this.longitude = longitude;
        this.latitude = latitude;
        this.typebase = typeBase;
    }

    // Getter pour id
    public int getId() {
        return id;
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

    // Getter pour typeBase
    public TypeBase getTypeBase() {
        return typebase;
    }

    // Setter pour typeBase
    public void setTypeBase(TypeBase typeBase) {
        this.typebase = typeBase;
    }

    // Méthode pour générer un identifiant unique
    private synchronized int generateUniqueId() {
        return nextId++;
    }
}
