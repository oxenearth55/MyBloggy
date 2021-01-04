import React, { Fragment } from 'react';

const PopupDanger = (clearForm) => {
    return(
        <Fragment>
            {/* // <!-- Central Modal Medium Danger --> */}
    <div class="modal " id="centralModalDanger" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-notify modal-danger" role="document">
        {/* <!--Content--> */}
        <div class="modal-content">
          {/* <!--Header--> */}
          <div class="modal-header">
            <p class="heading lead">Warnning</p>
   
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="white-text">&times;</span>
            </button>
          </div>
   
          {/* <!--Body--> */}
          <div class="modal-body">
            <div class="text-center">
              <i class="fas fa-times fa-4x mb-3 animated rotateIn"></i>
              <p>If you click close button, the blog form will be discharged </p>
            </div>
          </div>
   
          {/* <!--Footer--> */}
          <div class="modal-footer justify-content-center">
            <a type="button" data-dismiss="modal" onClick={() => clearForm } class="btn btn-danger">close<i class="far fa-times-circle ml-1 text-white"></i></a>
            <a type="button" class="btn btn-outline-danger waves-effect" data-dismiss="modal">cancle</a>
          </div>
        </div>
        {/* <!--/.Content--> */}
      </div>
    </div>
    {/* // <!-- Central Modal Medium Danger--> */}
            
        </Fragment>
    )

     }
export default PopupDanger;
