package pw.react.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class SampleBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SampleBackendApplication.class, args);
	}
}
