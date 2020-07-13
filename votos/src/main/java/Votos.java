public class Votos {
    private int total;
    private int validos;
    private int brancos;
    private int nulos;

    public Votos() {

    }

    public Votos(int total, int validos, int brancos, int nulos) {
        this.total=total;
        this.validos=validos;
        this.brancos=brancos;
        this.nulos=nulos;
    }

    public float getPercentualValidos() {
        return (total>0) ? ((float) validos * 100 / total) : 0;
    }

    public float getPercentualBrancos() {
        return (total>0) ? ((float) brancos * 100 / total) : 0;
    }

    public float getPercentualNulos() {
        return (total>0) ? ((float) nulos * 100 / total) : 0;
    }
}
