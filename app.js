import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = "https://pxevyujyyjqdtgrhhimt.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4ZXZ5dWp5eWpxZHRncmhoaW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MjQ3MTQsImV4cCI6MjA4OTUwMDcxNH0.QWBo18FqpSkeOxVZeXNhKz11Nqfa_nkxCaMLtqPWOTA"

const supabase = createClient(supabaseUrl, supabaseKey)
// window.uploadImage = uploadImage
const bucket = "photos"

async function uploadImage() {
  const file = document.getElementById("fileInput").files[0]
  if (!file) return alert("Select file")

  const fileName = Date.now() + "-" + file.name

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file)

  if (error) {
    console.log(error)
    alert("Upload failed")
  } else {
    loadImages()
  }
}

// 👇 YE ADD KARNA HAI
window.uploadImage = uploadImage

async function loadImages() {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list()

  const gallery = document.getElementById("gallery")
  gallery.innerHTML = ""

  data.forEach(file => {
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(file.name)

    const img = document.createElement("img")
    img.src = urlData.publicUrl

    gallery.appendChild(img)
  })
}

loadImages()