package real.models;

public class TypeVehicle {
    private static int nextId = 1;
    private int id;
    private int capacity;
    private String name;
    private TypeActor typeActor;

    public TypeVehicle(int capacity, String name, TypeActor typeActor) {
        this.id = generateUniqueId();
        this.capacity = capacity;
        this.name = name;
        this.typeActor = typeActor;
    }

    // Getter pour id
    public int getId() {
        return id;
    }

    // Getter pour capacity
    public int getCapacity() {
        return capacity;
    }

    // Setter pour capacity
    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    // Getter pour typeActor
    public TypeActor getTypeActor() {
        return typeActor;
    }

    // Setter pour name
    public void setName(String name) {
        this.name = name;
    }

    // Getter pour typeActor
    public String getName() {
        return name;
    }

    // Setter pour typeActor
    public void setTypeActor(TypeActor typeActor) {
        this.typeActor = typeActor;
    }

    // Méthode pour générer un identifiant unique
    private synchronized int generateUniqueId() {
        return nextId++;
    }
}
