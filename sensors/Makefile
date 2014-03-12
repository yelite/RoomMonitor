SUBDIR := BMP DHT LightSensor
 
.PHONY: all
all: 
	for i in $(SUBDIR); do make -C $$i || exit 1; done

.PHONY: clean
clean: 
	for i in $(SUBDIR); do make -C $$i clean || exit 1; done