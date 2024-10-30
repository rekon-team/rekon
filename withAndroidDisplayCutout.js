const { withDangerousMod, AndroidConfig } = require("expo/config-plugins");
const fs = require("fs/promises");
const path = require("path");

const withAndroidDisplayCutout = (config) => {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const resDir = await AndroidConfig.Paths.getResourceFolderAsync(
        config.modRequest.projectRoot
      );
      const valuesV28Path = path.join(resDir, "values-v28");
      const stylesFilePath = path.resolve(valuesV28Path, "styles.xml");

      if (!(await pathExistsAsync(valuesV28Path))) {
        await fs.mkdir(valuesV28Path, { recursive: true });
      }

      let stylesContent;
      if (await pathExistsAsync(stylesFilePath)) {
        stylesContent = await fs.readFile(stylesFilePath, "utf8");
      } else {
        stylesContent = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Items will be added here -->
    </style>
</resources>`;
      }

      if (
        !stylesContent.includes(
          'name="android:windowLayoutInDisplayCutoutMode"'
        )
      ) {
        const replacement = `  <item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item>\n    </style>`;
        stylesContent = stylesContent.replace("</style>", replacement);
      }

      await fs.writeFile(stylesFilePath, stylesContent);

      return config;
    },
  ]);
};

async function pathExistsAsync(file) {
  return !!(await fs.stat(file).catch(() => null)) ?? false;
}

module.exports = withAndroidDisplayCutout;