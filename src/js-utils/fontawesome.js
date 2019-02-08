import { library } from '@fortawesome/fontawesome-svg-core'
import * as faIcons from '@fortawesome/free-solid-svg-icons'

// Add all SVG icons to library. See https://github.com/FortAwesome/react-fontawesome#build-a-library-to-reference-icons-throughout-your-app-more-conveniently
for (var icon in faIcons) {
  // Not everything exported from '@fortawesome/free-solid-svg-icons' is an
  // icon that can be added to the library.
  if (icon.substring(0,2) === 'fa' && icon !== 'fas') {
    library.add(faIcons[icon]);
  }
}
