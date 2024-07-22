export default function getFile(file: string | undefined) {
  if (file) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if (
      !file.startsWith('http://') &&
      !file.startsWith('https://') &&
      !file.startsWith('blob:')
    ) {
      // `${baseUrl}/file/${file}`

      return `${baseUrl}/emp-admin/file/${file}`;
      // return `192.168.1.116:8000/emp-admin/avatar/${file}`;
    }
  }
  return file;
}
