set -e
npm run generate
cd dist
git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:tom00502/pokemon-adventurer-nuxt.git main:gh-pages

cd -