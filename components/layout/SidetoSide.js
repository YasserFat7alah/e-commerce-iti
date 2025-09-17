/* 
*  This is a side to side Layout left and right panels
*   options: => hideLeft => hide the left side on mobile
*            => hideRight => hide the right side on mobile
*
*/

import FloatLogo from "../ui/floatingLogo.js";

export default function SideToSide(_leftPanel, _rightPanel, _options = 'hideLeft') {
  const hideOnSmall = `d-none d-md-block p-0`;
  const display = `d-flex align-items-center justify-content-center py-5 position-relative`

  return `
       <div class="container-fluid">
        <div class="row h-100">
            <!-- Left Half -->
            <div class="col-md-6  ${_options === 'hideLeft' ? hideOnSmall : display}" style="height: 100vh !important; overflow:hidden;">
            ${_options !== 'hideLeft'? FloatLogo(): '' }
              ${_leftPanel}
            </div>

          <!-- Right Half -->
          <div class="col-md-6 ${_options === 'hideRight' ? hideOnSmall : display}" style="height: 100vh !important; overflow:hidden;">
          ${_options !== 'hideRight' ? FloatLogo() : '' }
              ${_rightPanel}
            </div>
        </div>
      </div>
    `
}