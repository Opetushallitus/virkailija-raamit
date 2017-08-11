package fi.vm.sade.virkailijaraamit;

import com.amazonaws.metrics.AwsSdkMetrics;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class AwsConfig implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent event) {
        AwsSdkMetrics.enableDefaultMetrics();
    }

    @Override
    public void contextDestroyed(ServletContextEvent event) {}
}