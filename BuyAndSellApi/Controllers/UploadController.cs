using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BuyAndSellApi.Controllers {

    [Produces ("application/json")]
    [Route ("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase {

        //private readonly string[] ACCEPTED_FILE_TYPES = new [] { ".jpg", ".jpeg", ".png" };
        //private readonly IHostingEnvironment _hostingEnvironment;

        public UploadController (IHostingEnvironment hostingEnvironment) {
            //_hostingEnvironment = hostingEnvironment;
        }
        /// <summary>
        /// Upload image.
        /// </summary>
        /// <returns>The path of the uploaded image.</returns>
        /// <response code="201">the path of the uploaded image.</response>
        /// <response code="400">if the file is null.</response>
        [HttpPost, DisableRequestSizeLimit]
        public ActionResult Upload () {
            try {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine ("Resources", "Images");
                var pathToSave = Path.Combine (Directory.GetCurrentDirectory (), folderName);

                if (file.Length > 0) {
                    var fileName = ContentDispositionHeaderValue.Parse (file.ContentDisposition).FileName.Trim ('"');
                    var fullPath = Path.Combine (pathToSave, fileName);
                    var dbPath = Path.Combine (folderName, fileName);

                    using (var stream = new FileStream (fullPath, FileMode.Create)) {
                        file.CopyTo (stream);
                    }

                    return Ok (new { dbPath });
                } else {
                    return BadRequest ();
                }
            } catch (Exception ex) {
                return StatusCode (500, "Error message from server: " + ex);
            }
        }
    }
}