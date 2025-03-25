package com.example.eventsystem;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(classes = EventsystemApplication.class)
public class EventsystemApplicationTests {

	@Test
	void contextLoads(ApplicationContext context) {
		assertNotNull(context, "ApplicationContext должен успешно загружаться");
	}
}