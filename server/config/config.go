package config

import (
	"os"
	"strconv"
	"sync"

	"github.com/sirupsen/logrus"
)

const (
	defaultHTTPPort = 6001
)

// Config holds necessary config values.
type Config struct {
	HTTPPort int
}

var (
	once   sync.Once
	config Config
)

// LoadConfig instantiates a singleton object that holds necessary config values.
// This function panics if required environment values are not set properly.
func LoadConfig() Config {
	once.Do(func() {
		config = Config{
			HTTPPort: parseHTTPPort(),
		}
	})

	return config
}

func parseHTTPPort() int {
	httpPortStr, ok := os.LookupEnv("HTTP_PORT")
	if !ok || httpPortStr == "" {
		return defaultHTTPPort
	}

	httpPort, err := strconv.ParseInt(httpPortStr, 10, 32)
	if err != nil {
		logrus.Fatalf("HTTP_PORT value '%s' could not be parsed due to %s", httpPortStr, err.Error())
	}

	return int(httpPort)
}
