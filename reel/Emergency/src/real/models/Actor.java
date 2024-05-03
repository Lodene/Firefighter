package real.models;

public class Actor {
    private static int nextId = 1;
    private int id;
    private int tiredness;
    private TypeActor typeActor;
    private Vehicle vehicle;
    private Base base;

    public Actor(int tiredness, TypeActor typeActor, Vehicle vehicle, Base base) {
        this.id = generateUniqueId();
        this.tiredness = tiredness;
        this.typeActor = typeActor;
        this.vehicle = vehicle;
        this.base = base;
    }

    private synchronized int generateUniqueId() {
        return nextId++;
    }

    // Getters
    public int getId() {
        return id;
    }

    public int gettiredness() {
        return tiredness;
    }

    public TypeActor getTypeActor() {
        return typeActor;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public Base getBase() {
        return base;
    }

    // Setters
    public void setId(int id) {
        this.id = id;
    }

    public void settiredness(int tiredness) {
        this.tiredness = tiredness;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public void setBase(Base base) {
        this.base = base;
    }
}
