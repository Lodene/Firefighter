package real.models;

public class TypeEvent {
    private static int nextId = 1;
    private int id;
    private String name;

    public TypeEvent(String name) {
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

    public void setName(String name) {
        this.name = name;
    }
}
