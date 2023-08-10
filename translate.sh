locales=("pt-br")
for value in "${locales[@]}"
do
  echo "Executing translation migration for: $value"
  npm run write-translations -- --locale $value
  mkdir -p i18n/$value/docusaurus-plugin-content-docs/current
  cp -r docs/** i18n/$value/docusaurus-plugin-content-docs/current

  mkdir -p i18n/$value/docusaurus-plugin-content-blog
  cp -r blog/** i18n/$value/docusaurus-plugin-content-blog

  mkdir -p i18n/$value/docusaurus-plugin-content-pages
  cp -r src/pages/**.md i18n/$value/docusaurus-plugin-content-pages
  echo "Finish executing translation migration for: $value"
done
