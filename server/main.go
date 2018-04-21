package main

import (
	"github.com/rawfish-dev/project-base/server/api"
	"github.com/rawfish-dev/project-base/server/config"
)

func main() {
	loadedConfig := config.LoadConfig()

	projectBase := api.NewAPI(loadedConfig)

	projectBase.Run()
}
