set -e
npm run generate
cd dist
cp ./index.html ./404.html
git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:tom00502/pokemon-adventurer-nuxt.git master:gh-pages

cd -