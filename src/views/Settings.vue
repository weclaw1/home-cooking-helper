<script setup lang="ts">
import DataExporter from "../components/DataExporter.vue";
import DataImporter from "../components/DataImporter.vue";

function downloadExportedData(fileName: string, data: Blob) {
  const url = window.URL.createObjectURL(data);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  // the filename you want
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}
</script>
<template>
  <section class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile box is-flex is-flex-direction-column">
          <h4 class="title is-4">{{ $t("settings.export.title") }}</h4>
          <div>
            <data-exporter @export-data="downloadExportedData" />
          </div>
        </div>
        <div class="tile box is-flex is-flex-direction-column">
          <h4 class="title is-4">{{ $t("settings.import.title") }}</h4>
          <div>
            <data-importer />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
