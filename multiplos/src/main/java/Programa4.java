import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Programa4 {
    public static void main(String[] args) {
        mylog("============================================");
        mylog("Programa iniciado...");
        int n=10;
        int result=somaMultiplos(n);
        System.out.println("somaMultiplos("+n+")="+result);
        mylog("Programa finalizado...");
        mylog("============================================");
    }

    public static int somaMultiplos(int n) {
        mylog("multiplos()");
        int soma=0;
        for (int i = 1; i < n; i++) {
            if (((i % 3)==0) || ((i%5)==0)) {
                soma+=i;
            }
        }
        return soma;
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
