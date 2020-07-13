import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Programa3 {
    public static void main(String[] args) {
        mylog("============================================");
        mylog("Programa iniciado...");
        int[] teste={0, 1, 2, 3, 4, 5, 6};
        for (int i = 0; i < teste.length; i++) {
            int n=teste[i];
            int result=fatorial(n);
            System.out.println("fatorial("+n+")="+result);
        }
        mylog("Programa finalizado...");
        mylog("============================================");
    }

    public static int fatorial(int n) {
        int total=1;
        for (int i = 1; i <= n; i++) {
            total=total*i;
        }
        return total;
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
