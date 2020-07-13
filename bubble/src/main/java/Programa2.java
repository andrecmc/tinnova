import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;

public class Programa2 {
    public static void main(String[] args) {
        mylog("============================================");
        mylog("Programa iniciado...");
        int[] vetor={5, 3, 2, 4, 7, 1, 0, 6};
        ordena(vetor);
        mylog("Programa finalizado...");
        mylog("============================================");
    }

    public static void ordena(int[] v) {
        mylog("ordena()");
        for (int j=v.length-1;j>=0;j--) {
            for (int i = 0; i < j; i++) {
                if (v[i] > v[i + 1]) {
                    int temp = v[i];
                    v[i] = v[i + 1];
                    v[i + 1] = temp;
                }
                mylog(Arrays.toString(v));
            }
        }
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
