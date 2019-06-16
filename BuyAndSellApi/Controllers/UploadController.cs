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

    [Route ("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase {

        //private readonly string[] ACCEPTED_FILE_TYPES = new [] { ".jpg", ".jpeg", ".png" };
        //private readonly IHostingEnvironment _hostingEnvironment;

        public UploadController (IHostingEnvironment hostingEnvironment) {
            //_hostingEnvironment = hostingEnvironment;
        }

        //[HttpPost, DisableRequestSizeLimit]
        [HttpPost]
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
            //public ActionResult UploadFile (IFormFile filesData) {
            // try {
            //     if (filesData == null) return BadRequest ("Null File");
            //     if (filesData.Length == 0) {
            //         return BadRequest ("Empty File");
            //     }
            //     if (filesData.Length > 10 * 1024 * 1024) return BadRequest ("Max file size exceeded.");
            //     if (!ACCEPTED_FILE_TYPES.Any (s => s == Path.GetExtension (filesData.FileName).ToLower ())) return BadRequest ("Invalid file type.");
            //     var uploadFilesPath = Path.Combine (_hostingEnvironment.WebRootPath, "Resources");
            //     if (!Directory.Exists (uploadFilesPath))
            //         Directory.CreateDirectory (uploadFilesPath);
            //     var fileName = Guid.NewGuid ().ToString () + Path.GetExtension (filesData.FileName);
            //     var filePath = Path.Combine (uploadFilesPath, fileName);
            //     using (var stream = new FileStream (filePath, FileMode.Create)) {
            //         filesData.CopyToAsync (stream);
            //     }

            //     return Ok (new { filePath });
            // } catch (Exception ex) {
            //     return StatusCode (500, ex);
            // }
            // try {

            //     if (filesData == null) return BadRequest ("Null File");
            //     if (filesData.Length == 0) {
            //         return BadRequest ("Empty File");
            //     }

            //     //return Ok ("Uploaded File" + Request.Form);;
            //     var file = Request.Form.Files[0];
            //     string folderName = "Upload";
            //     string webRootPath = _hostingEnvironment.WebRootPath;
            //     string newPath = Path.Combine (webRootPath, folderName);
            //     if (!Directory.Exists (newPath)) {
            //         Directory.CreateDirectory (newPath);
            //     }
            //     if (file.Length > 0) {
            //         string fileName = ContentDispositionHeaderValue.Parse (file.ContentDisposition).FileName.Trim ('"');
            //         string fullPath = Path.Combine (newPath, fileName);
            //         using (var stream = new FileStream (fullPath, FileMode.Create)) {
            //             file.CopyTo (stream);
            //         }
            //         return Ok ("Upload Successful.");
            //     } else {
            //         return BadRequest ();
            //     }
            // } catch (System.Exception ex) {
            //     return StatusCode (500, ex);
            // }
        }

        //[HttpPost, DisableRequestSizeLimit]
        /*public IActionResult Upload () {
            try {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine ("Resources", "Images");
                var pathToSave = Path.Combine (Directory.GetCurrentDirectory (), folderName);

                //System.Diagnostics.Debug.WriteLine (file.Length)
                System.Diagnostics.Debug.WriteLine(file.Length);
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
                return StatusCode (500, "Internal server error");
            }
        }*/

        /*[HttpPost]
        public async Task<IActionResult> Post(List<IFormFile> files)
        {
            long size = files.Sum(f => f.Length);

            // full path to file in temp location
            var filePath = Path.GetTempFileName();

            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                }
            }

            // process uploaded files
            // Don't rely on or trust the FileName property without validation.

            return Ok(new { count = files.Count, size, filePath});
        }*/

        //public IActionResult Upload()
        //{
        //    try
        //    {
        //        var files = Request.Form.Files;
        //        var folderName = Path.Combine("StaticFiles", "Images");
        //        var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

        //        if (files.Any(f => f.Length == 0))
        //        {
        //            return BadRequest();
        //        }

        //        foreach (var file in files)
        //        {
        //            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
        //            var fullPath = Path.Combine(pathToSave, fileName);
        //            var dbPath = Path.Combine(folderName, fileName);

        //            using (var stream = new FileStream(fullPath, FileMode.Create))
        //            {
        //                file.CopyTo(stream);
        //            }
        //        }

        //        return Ok("All the files are successfully uploaded.");
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, "Internal server error");
        //    }
        //}
    }
}