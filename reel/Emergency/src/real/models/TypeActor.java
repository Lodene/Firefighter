package real.models;

public class TypeActor {
    private static int nextId = 1;
    private int id;
    private String name;

    public TypeActor(String name) {
        this.id = generateUniqueId();
        this.name = name;
    }

    private synchronized int generateUniqueId() {
        return nextId++;
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    // Setters
    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }
}
