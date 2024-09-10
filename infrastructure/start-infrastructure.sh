this_dir=$(dirname "$(realpath $0)")
cd "$this_dir"

docker compose -f docker-compose.yml up
