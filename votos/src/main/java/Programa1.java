import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Programa1 {
    public static void main(String[] args) {
        mylog("============================================");
        mylog("Programa iniciado...");
        int total=1000;
        int validos=800;
        int brancos=150;
        int nulos=50;
        calcula(total, validos, brancos, nulos);
        mylog("Programa finalizado...");
        mylog("============================================");
    }

    public static void calcula(int total, int validos, int brancos, int nulos) {
        mylog("calcula()");
        Votos v = new Votos(total, validos, brancos, nulos);
        System.out.println("Total="+total+" Validos="+validos+" Brancos="+brancos+" Nulos="+nulos);
        System.out.println("Validos (%)="+v.getPercentualValidos());
        System.out.println("Brancos (%)="+v.getPercentualBrancos());
        System.out.println("Nulos (%)="+v.getPercentualNulos());
    }

    public static void mylog(String msg) {
        System.out.println(getCurrentDateTime()+" - "+msg+"\n");
    }

    public static String getCurrentDateTime() {
        // the string representation of date (month/day/year)
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

        // Get the date today using Calendar object.
        Date today = Calendar.getInstance().getTime();
        // Using DateFormat format method we can create a string
        // representation of a date with the defined format.
        String reportDate = df.format(today);

        return reportDate;
    }
}
