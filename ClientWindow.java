import ru.geekbrains.chat.network.TCPConnection;
import ru.geekbrains.chat.network.TCPConnectionListener;
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
public class ClientWindow extends JFrame implements ActionListener, TCPConnectionListener {
    private static final String IP_ADDR = "127.0.0.1";
    private static final int PORT = 8080;
    private static final int width = 600;
    private static final int height = 400;
    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new ClientWindow();
            }
        });
    }
    private final JTextArea log = new JTextArea();
    private final JTextField fieldNickname = new JTextField("Alex");
    private final JTextField fieldInput = new JTextField();
    private TCPConnection connection;
    private ClientWindow() {
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        setSize(width, height);
        setLocationRelativeTo(null);
        setAlwaysOnTop(true);
        log.setEditable(false);
        log.setLineWrap(true);
        add(log, BorderLayout.CENTER);
        fieldInput.addActionListener(this);
        add(fieldInput, BorderLayout.SOUTH);
        add(fieldNickname, BorderLayout.NORTH);
        setVisible(true);
        try {
            connection = new TCPConnection(this, IP_ADDR, PORT);
        } catch (IOException e) {
            printMag("Connection exception: " + e);
        }
    }
    @Override
    public void actionPerformed(ActionEvent e) {
        String mag = fieldInput.getText();
        if (mag.equals(" ")) return;
        fieldInput.setText(null);
        connection.sendString(fieldNickname.getText() + ": " + mag);
    }
    @Override
    public void onConnectionReady(TCPConnection tcpConnection) {
        printMag("Connection ready...");
    }
    @Override
    public void onReceiveString(TCPConnection tcpConnection, String value) {
        printMag(value);
    }
    @Override
    public void onDisconnect(TCPConnection tcpConnection) {
        printMag("Connection close...");
    }
    @Override
    public void onException(TCPConnection tcpConnection, Exception e) {
        printMag("Connection exception: " + e);
    }
    private synchronized void printMag(final String mag){
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                log.append(mag + "\n");
                log.setCaretPosition(log.getDocument().getLength());
            }
        });
    }
}