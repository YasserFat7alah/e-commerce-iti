import View from "../../components/core/view.js";
import { localStore } from "../../scripts/utils/storage.js";
import { Anchor } from "../../components/ui/links.js";
import { getProductThumbnail, showConfirmDialog } from "../../scripts/utils/dashboardUtils.js";
import { getCurrentUser } from "../../data/authentication.js";

export default class SellerProducts extends View {
  template() {
    return `
      <div class="container-fluid mt-4">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 p-4 bg-white shadow rounded">
            <div class="d-flex gap-3 mb-3">
              <div class="d-flex align-items-center bg-warning rounded  px-3">${Anchor(`<i class="fas fa-plus bg"></i> New Product`, "/seller/addproduct")}   </div>
              <input type="text" id="searchInput" class="form-control w-50 w-lg-25" placeholder="Search products...">
            </div>

            <div class="table-responsive">
              <table class="table table-bordered table-striped text-center align-middle">
                <thead class="table-dark">
                  <tr>
                    <th>Index</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>SubCategory</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="productTableBody"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Product View Modal -->
      <div class="modal fade" id="productViewModal" tabindex="-1" aria-labelledby="productViewLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="productViewLabel">Product Details</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="productViewBody"></div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Product Modal -->
      <div class="modal fade" id="productEditModal" tabindex="-1" aria-labelledby="productEditModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="productEditModalLabel">Edit Product</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="productEditBody"></div>
          </div>
        </div>
      </div>
    `;
  }

  script() {
    const NAME_REGEX = /^[^0-9]+$/;
    
    // Helper functions
    const createToast = (message, type = 'success') => {
      const toastElement = document.createElement("div");
      toastElement.className = "toast-container position-fixed top-0 end-0 p-3";
      toastElement.innerHTML = `
        <div class="toast align-items-center text-bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      `;
      document.body.appendChild(toastElement);
      const toast = new bootstrap.Toast(toastElement.querySelector(".toast"));
      toast.show();
      setTimeout(() => toastElement.remove(), 3000);
    };

    const setInvalid = (input, message) => {
      input.classList.add("is-invalid");
      let feedback = input.parentElement.querySelector(".invalid-feedback");
      if (!feedback) {
        feedback = document.createElement("div");
        feedback.className = "invalid-feedback";
        input.parentElement.appendChild(feedback);
      }
      feedback.textContent = message;
    };

    const clearInvalid = (input) => {
      input.classList.remove("is-invalid");
      const feedback = input.parentElement.querySelector(".invalid-feedback");
      if (feedback) feedback.textContent = "";
    };

    const getImagePath = (product, imageName) => {
      const category = product.category ? product.category.toLowerCase() : 'unisex';
      const subCategory = product.subCategory || product.subcategory || 'hat';
      return `data/imgs/products/${category}/${subCategory.toLowerCase()}/${product.id}/${imageName}`;
    };

    function generateStockHTML(stock, product) {
      if (!stock || stock.length === 0) return "<p>No stock available</p>";

      return stock.map(s => {
        const sizesTable = s.sizes?.length > 0 ? `
          <table class="table table-sm table-bordered mb-2">
            <thead class="table-light">
              <tr><th>Size</th><th>Qty</th></tr>
            </thead>
            <tbody>
              ${s.sizes.map(sz => `<tr><td>${sz.name || sz.size}</td><td>${sz.qty}</td></tr>`).join("")}
            </tbody>
          </table>
        ` : "<p>-</p>";

        const imagesHTML = s.images?.length > 0 ? 
          s.images.map(img => `
            <img src="${getImagePath(product, img)}" 
                 alt="${product.name}" 
                 class="img-thumbnail me-2 mb-2" 
                 style="width: 100px; height: 100px; object-fit: cover;"
                >
          `).join("") : 
          "<p class='text-muted fst-italic'>No images available</p>";

        return `
          <div class="card mb-2 shadow-lg border-0 rounded-3">
            <div class="card-body">
              <p><strong>Color:</strong> ${s.color || "-"}</p>
              <p><strong>Sizes & Qty:</strong></p>
              ${sizesTable}
              <p><strong>Images:</strong></p>
              <div class="image-preview">${imagesHTML}</div>
            </div>
          </div>
        `;
      }).join("");
    }

    function generateStockCard(productIndex, stockIndex, stock = {}, product = {}) {
      const cardId = `stock-card-${productIndex}-${stockIndex}-${Date.now()}`;
      const card = document.createElement("div");
      card.className = "card mb-4 shadow-lg border-0 rounded-3";
      card.setAttribute('data-card-id', cardId);
      
      card.innerHTML = `
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label fw-bold">Color</label>
              <input type="text" name="stock[${productIndex}][${stockIndex}][color]" class="form-control shadow-sm" placeholder="e.g. Brown" value="${stock.color || ''}" required>
              <div class="invalid-feedback">Please enter a color.</div>
            </div>
            <div class="col-md-8">
              <label class="form-label fw-bold">Images</label>
              <div class="input-group mb-2">
                <input type="file" name="stock[${productIndex}][${stockIndex}][images][]" class="form-control shadow-sm" accept="image/*" multiple>
                <input type="hidden" name="stock[${productIndex}][${stockIndex}][existingImages]" value="${stock.images?.join(", ") || ""}">
              </div>
              <div class="invalid-feedback">Please upload at least one image.</div>
              <div class="image-preview mt-2"></div>
            </div>
          </div>
          <div class="sizes-section mt-3">
            <h6 class="fw-bold text-secondary">Sizes & Qty</h6>
            <div class="size-rows">
              ${generateSizeRows(productIndex, stockIndex, stock.sizes || [])}
            </div>
          </div>
        </div>
      `;

      // Initialize handlers
      initializeImageHandlers(card, product, cardId);
      initializeSizeHandlers(card, productIndex, stockIndex);
      
      return card;
    }

    function generateSizeRows(productIndex, stockIndex, sizes) {
      if (!sizes?.length) {
        return `
          <div class="row g-3 size-item align-items-center mt-2">
            <div class="col-md-5">
              <input type="text" name="stock[${productIndex}][${stockIndex}][sizes][0][size]" class="form-control shadow-sm" placeholder="e.g. M" required>
              <div class="invalid-feedback">Please enter a size name.</div>
            </div>
            <div class="col-md-5">
              <input type="number" name="stock[${productIndex}][${stockIndex}][sizes][0][qty]" class="form-control shadow-sm" placeholder="Qty" min="0" required>
              <div class="invalid-feedback">Please enter a valid quantity (0 or more).</div>
            </div>
            <div class="col-md-2 d-flex">
              <button type="button" class="addSizeAndQty btn btn-success btn-sm rounded-circle shadow-sm ms-2">
                <i class="fas fa-plus"></i>
              </button>
              <button type="button" class="removeSizeAndQty btn btn-danger btn-sm rounded-circle shadow-sm ms-2">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        `;
      }

      return sizes.map((sz, sizeIndex) => `
        <div class="row g-3 size-item align-items-center mt-2">
          <div class="col-md-5">
            <input type="text" name="stock[${productIndex}][${stockIndex}][sizes][${sizeIndex}][size]" class="form-control shadow-sm" placeholder="e.g. M" value="${sz.name || sz.size || ''}" required>
            <div class="invalid-feedback">Please enter a size name.</div>
          </div>
          <div class="col-md-5">
            <input type="number" name="stock[${productIndex}][${stockIndex}][sizes][${sizeIndex}][qty]" class="form-control shadow-sm" placeholder="Qty" min="0" value="${sz.qty || ''}" required>
            <div class="invalid-feedback">Please enter a valid quantity (0 or more).</div>
          </div>
          <div class="col-md-2 d-flex">
            <button type="button" class="addSizeAndQty btn btn-success btn-sm rounded-circle shadow-sm ms-2">
              <i class="fas fa-plus"></i>
            </button>
            <button type="button" class="removeSizeAndQty btn btn-danger btn-sm rounded-circle shadow-sm ms-2">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `).join("");
    }

    function initializeImageHandlers(card, product, cardId) {
      const fileInput = card.querySelector("input[type='file']");
      const hiddenInput = card.querySelector("input[type='hidden']");
      const preview = card.querySelector(".image-preview");
      
      // Create unique state for this card to prevent conflicts
      const cardState = {
        removedExistingImages: new Set(),
        newFilesList: [],
        cardId: cardId
      };

      const updateImagePreview = () => {
        const existingImages = hiddenInput.value ? 
          hiddenInput.value.split(", ").filter(img => img.trim() && !cardState.removedExistingImages.has(img)) : [];
        
        if (existingImages.length === 0 && cardState.newFilesList.length === 0) {
          preview.innerHTML = "<p class='text-muted fst-italic'>No images available</p>";
          return;
        }

        let htmlContent = "";
        
        // Display existing images with unique identifiers
        existingImages.forEach((img, imgIndex) => {
          const uniqueId = `${cardId}-existing-${imgIndex}-${img.replace(/[^a-zA-Z0-9]/g, '')}`;
          htmlContent += `
            <div class="d-inline-block position-relative me-2 mb-2" data-image-type="existing" data-unique-id="${uniqueId}">
              <img src="${getImagePath(product, img)}" 
                   alt="${product.name}" 
                   class="img-thumbnail" 
                   style="width: 80px; height: 80px; object-fit: cover;"
                 >
              <button type="button" 
                      class="position-absolute remove-image-btn" 
                      data-remove-type="existing"
                      data-image-name="${img}"
                      data-card-id="${cardId}"
                      data-unique-id="${uniqueId}"
                      style="top: -6px; right: -6px; width: 18px; height: 18px; border-radius: 50%; padding: 0; font-size: 0.6rem; background: #dc3545; border: 1px solid #dc3545; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10;">
                ×
              </button>
            </div>
          `;
        });
        
        // Display new files
        cardState.newFilesList.forEach((file, fileIndex) => {
          const uniqueId = `${cardId}-new-${fileIndex}-${file.name.replace(/[^a-zA-Z0-9]/g, '')}`;
          htmlContent += `
            <div class="d-inline-block position-relative me-2 mb-2" data-image-type="new" data-unique-id="${uniqueId}">
              <img src="" 
                   alt="${file.name}" 
                   class="img-thumbnail" 
                   style="width: 80px; height: 80px; object-fit: cover; background: #f8f9fa;">
              <button type="button" 
                      class="position-absolute remove-image-btn" 
                      data-remove-type="new"
                      data-file-index="${fileIndex}"
                      data-card-id="${cardId}"
                      data-unique-id="${uniqueId}"
                      style="top: -6px; right: -6px; width: 18px; height: 18px; border-radius: 50%; padding: 0; font-size: 0.6rem; background: #dc3545; border: 1px solid #dc3545; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10;">
                ×
              </button>
              <div class="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-75 text-white text-center" style="font-size: 0.7rem; padding: 2px;">
                ${file.name.length > 12 ? file.name.substring(0, 12) + '...' : file.name}
              </div>
            </div>
          `;
        });

        preview.innerHTML = htmlContent;
        
        // Load FileReader for new files after DOM update
        cardState.newFilesList.forEach((file, fileIndex) => {
          const reader = new FileReader();
          reader.onload = function(e) {
            const filePreview = preview.querySelector(`[data-unique-id="${cardId}-new-${fileIndex}-${file.name.replace(/[^a-zA-Z0-9]/g, '')}"]`);
            if (filePreview) {
              filePreview.querySelector('img').src = e.target.result;
            }
          };
          reader.readAsDataURL(file);
        });
      };

      // File input change handler
      fileInput.addEventListener("change", function() {
        cardState.newFilesList = Array.from(this.files);
        updateImagePreview();
      });

      // Image removal handler with robust event handling
      preview.addEventListener("click", function(e) {
        const removeBtn = e.target.closest(".remove-image-btn");
        if (!removeBtn) return;

        // Verify this button belongs to our card
        const btnCardId = removeBtn.getAttribute("data-card-id");
        if (btnCardId !== cardId) return;

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const removeType = removeBtn.getAttribute("data-remove-type");
        
        if (removeType === "existing") {
          const imageName = removeBtn.getAttribute("data-image-name");
          cardState.removedExistingImages.add(imageName);
          
          // Update hidden input
          const currentImages = hiddenInput.value ? hiddenInput.value.split(", ").filter(img => img.trim()) : [];
          const updatedImages = currentImages.filter(img => !cardState.removedExistingImages.has(img));
          hiddenInput.value = updatedImages.join(", ");
          
        } else if (removeType === "new") {
          const fileIndex = parseInt(removeBtn.getAttribute("data-file-index"));
          if (fileIndex >= 0 && fileIndex < cardState.newFilesList.length) {
            cardState.newFilesList.splice(fileIndex, 1);
            
            // Update file input
            const dt = new DataTransfer();
            cardState.newFilesList.forEach(file => dt.items.add(file));
            fileInput.files = dt.files;
          }
        }
        
        updateImagePreview();
      }, true); // Use capture phase to ensure we get the event first

      // Initial preview update
      updateImagePreview();
    }

    function initializeSizeHandlers(card, productIndex, stockIndex) {
      const sizesSection = card.querySelector(".sizes-section");
      
      sizesSection.addEventListener("click", function(e) {
        e.stopPropagation();
        
        if (e.target.closest(".addSizeAndQty")) {
          const lastRow = sizesSection.querySelector(".size-item:last-of-type");
          const sizeInput = lastRow.querySelector("input[name*='[size]']");
          const qtyInput = lastRow.querySelector("input[name*='[qty]']");

          // Validate last row before adding new one
          let valid = true;
          if (!sizeInput.value.trim()) {
            setInvalid(sizeInput, "Please enter a size name.");
            valid = false;
          } else {
            clearInvalid(sizeInput);
          }
          
          if (!qtyInput.value.trim() || isNaN(parseInt(qtyInput.value)) || parseInt(qtyInput.value) < 0) {
            setInvalid(qtyInput, "Please enter a valid quantity (0 or more).");
            valid = false;
          } else {
            clearInvalid(qtyInput);
          }

          if (valid) {
            const sizeIndex = sizesSection.querySelectorAll(".size-item").length;
            const newRow = document.createElement("div");
            newRow.className = "row g-3 size-item align-items-center mt-2";
            newRow.innerHTML = `
              <div class="col-md-5">
                <input type="text" name="stock[${productIndex}][${stockIndex}][sizes][${sizeIndex}][size]" class="form-control shadow-sm" placeholder="e.g. M" required>
                <div class="invalid-feedback">Please enter a size name.</div>
              </div>
              <div class="col-md-5">
                <input type="number" name="stock[${productIndex}][${stockIndex}][sizes][${sizeIndex}][qty]" class="form-control shadow-sm" placeholder="Qty" min="0" required>
                <div class="invalid-feedback">Please enter a valid quantity (0 or more).</div>
              </div>
              <div class="col-md-2 d-flex">
                <button type="button" class="addSizeAndQty btn btn-success btn-sm rounded-circle shadow-sm ms-2">
                  <i class="fas fa-plus"></i>
                </button>
                <button type="button" class="removeSizeAndQty btn btn-danger btn-sm rounded-circle shadow-sm ms-2">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            `;
            sizesSection.querySelector(".size-rows").appendChild(newRow);
          }
        }

        if (e.target.closest(".removeSizeAndQty")) {
          const currentRow = e.target.closest(".size-item");
          const parent = currentRow.parentElement;
          if (parent.querySelectorAll(".size-item").length > 1) {
            currentRow.remove();
          }
        }
      });
    }

    function validateStockCard(card) {
      let valid = true;
      
      const color = card.querySelector("input[name*='[color]']");
      const hiddenInput = card.querySelector("input[name*='[existingImages]']");
      const fileInput = card.querySelector("input[name*='[images][]']");
      const hasImages = (hiddenInput.value && hiddenInput.value.trim()) || (fileInput.files && fileInput.files.length > 0);

      if (!color.value.trim()) {
        setInvalid(color, "Please enter a color.");
        valid = false;
      } else {
        clearInvalid(color);
      }

      if (!hasImages) {
        setInvalid(fileInput, "Please upload at least one image.");
        valid = false;
      } else {
        clearInvalid(fileInput);
      }

      const sizeRows = card.querySelectorAll(".size-item");
      let hasCompleteSize = false;

      sizeRows.forEach(row => {
        const sizeName = row.querySelector("input[name*='[size]']");
        const qty = row.querySelector("input[name*='[qty]']");
        
        if (sizeName.value.trim() && qty.value.trim() && !isNaN(parseInt(qty.value)) && parseInt(qty.value) >= 0) {
          hasCompleteSize = true;
          clearInvalid(sizeName);
          clearInvalid(qty);
        } else {
          if (!sizeName.value.trim()) setInvalid(sizeName, "Please enter a size name.");
          if (!qty.value.trim() || isNaN(parseInt(qty.value)) || parseInt(qty.value) < 0) {
            setInvalid(qty, "Please enter a valid quantity (0 or more).");
          }
        }
      });

      if (!hasCompleteSize) valid = false;
      return valid;
    }

    function loadProducts() {
      let user = getCurrentUser();
      let products = localStore.read("products", []).filter(prod => prod.sellerId === user.id);
      const tableBody = document.getElementById("productTableBody");
      tableBody.innerHTML = "";

      products.forEach((product, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>                
            <div class="d-flex align-items-center">
              <img src="${getProductThumbnail(product)}" 
                   alt="${product.name}" 
                   class="rounded me-3" 
                   style="width: 40px; height: 40px; object-fit: fill;" />
              <div>${product.name}</div>
            </div>
          </td>
          <td>${product.category}</td>
          <td>${product.subcategory || "-"}</td>
          <td>$${product.price}</td>
          <td><span class="badge ${product.status === "approved" ? "bg-success" : "bg-warning"}">${product.status}</span></td>
          <td>
            <button class="btn btn-sm btn-info text-white btn-view" data-product-index="${index}">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-sm btn-warning btn-edit" data-product-index="${index}">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger btn-remove" data-product-index="${index}">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        `;
        tableBody.appendChild(row);
      });

      // Event delegation for action buttons
      tableBody.addEventListener("click", async function(e) {
        const productIndex = parseInt(e.target.closest("button")?.getAttribute("data-product-index"));
        if (isNaN(productIndex)) return;

        const product = products[productIndex];
        
        if (e.target.closest(".btn-remove")) {
          const confirmed = await showConfirmDialog(`Are you sure you want to delete ${product.name}?`, "Confirm deletion");
          if (confirmed) {
            products.splice(productIndex, 1);
            localStorage.setItem("products", JSON.stringify(products));
            loadProducts();
            createToast("Product deleted successfully!", "success");
          }
        }
        
        if (e.target.closest(".btn-view")) {
          showProductView(product);
        }
        
        if (e.target.closest(".btn-edit")) {
          showProductEdit(product, productIndex);
        }
      });
    }

    function showProductView(product) {
      const modalBody = `
        <form class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" value="${product.name}" readonly>
          </div>
          <div class="col-md-6">
            <label class="form-label">Category</label>
            <input type="text" class="form-control" value="${product.category}" readonly>
          </div>
          <div class="col-md-6">
            <label class="form-label">SubCategory</label>
            <input type="text" class="form-control" value="${product.subcategory || "-"}" readonly>
          </div>
          <div class="col-md-6">
            <label class="form-label">Price</label>
            <input type="text" class="form-control" value="$${product.price}" readonly>
          </div>
          <div class="col-md-6">
            <label class="form-label">Material</label>
            <input type="text" class="form-control" value="${product.material || "-"}" readonly>
          </div>
          <div class="col-md-6">
            <label class="form-label">Brand</label>
            <input type="text" class="form-control" value="${product.brand || "-"}" readonly>
          </div>
          <div class="col-12">
            <label class="form-label">Description</label>
            <textarea class="form-control" rows="3" readonly>${product.description || "-"}</textarea>
          </div>
          <div class="col-12 mt-3">
            <h5>Stock</h5>
            ${generateStockHTML(product.stock, product)}
          </div>
        </form>
      `;

      document.getElementById("productViewBody").innerHTML = modalBody;
      new bootstrap.Modal(document.getElementById("productViewModal")).show();
    }

    function showProductEdit(product, productIndex) {
      const modalBody = `
        <form class="needs-validation row g-3" id="editProductForm" novalidate>
          <div class="col-md-6">
            <label for="name" class="form-label fw-bold">Product Name</label>
            <input type="text" name="name" class="form-control shadow-sm" value="${product.name}" required>
            <div class="invalid-feedback">Please enter a valid product name (letters only, max 100 characters).</div>
          </div>
          <div class="col-md-6">
            <label for="price" class="form-label fw-bold">Price</label>
            <div class="input-group shadow-sm">
              <input type="number" step="0.1" name="price" class="form-control" value="${product.price}" required>
              <span class="input-group-text bg-success text-white fw-bold">$</span>
            </div>
            <div class="invalid-feedback">Please enter a valid price.</div>
          </div>
          <div class="col-md-6">
            <label for="category" class="form-label fw-bold">Category</label>
            <select name="category" class="form-select shadow-sm" required>
              <option value="">Choose...</option>
              <option value="Women" ${product.category === "Women" ? "selected" : ""}>Women</option>
              <option value="Men" ${product.category === "Men" ? "selected" : ""}>Men</option>
              <option value="Unisex" ${product.category === "Unisex" ? "selected" : ""}>Unisex</option>
            </select>
            <div class="invalid-feedback">Please select a category.</div>
          </div>
          <div class="col-md-6">
            <label for="subcategory" class="form-label fw-bold">Subcategory</label>
            <input type="text" name="subcategory" class="form-control shadow-sm" placeholder="e.g. Bags" value="${product.subcategory || ""}" required>
            <div class="invalid-feedback">Please enter a subcategory.</div>
          </div>
          <div class="col-md-6">
            <label for="material" class="form-label fw-bold">Material</label>
            <input type="text" name="material" class="form-control shadow-sm" placeholder="e.g. PU Leather" value="${product.material || ""}" required>
            <div class="invalid-feedback">Please enter a valid material (letters only, max 100 characters).</div>
          </div>
          <div class="col-md-6">
            <label for="brand" class="form-label fw-bold">Brand</label>
            <input type="text" name="brand" class="form-control shadow-sm" placeholder="e.g. Shein" value="${product.brand || ""}" required>
            <div class="invalid-feedback">Please enter a valid brand (letters only, max 100 characters).</div>
          </div>
          <div class="col-12">
            <label for="description" class="form-label fw-bold">Description</label>
            <textarea name="description" class="form-control shadow-sm" rows="3" required>${product.description || ""}</textarea>
            <div class="invalid-feedback">Description is required (at least 30 characters).</div>
          </div>
          <div class="col-12">
            <h4 class="mt-4 fw-bold">Stock</h4>
            <div class="mb-3">
              <button type="button" class="btn btn-success shadow-sm" id="addStockBtn">
                <i class="fas fa-plus"></i> Add New Stock
              </button>
            </div>
            <div id="editStockSection"></div>
          </div>
          <div class="card-footer d-flex gap-3 justify-content-end">
            <button type="submit" class="btn btn-success shadow-lg mt-2">
              <i class="fas fa-save"></i> Save Changes
            </button>
            <button type="button" class="btn btn-danger shadow-lg mt-2" data-bs-dismiss="modal">
              <i class="fas fa-times"></i> Cancel
            </button>
          </div>
        </form>
      `;

      document.getElementById("productEditBody").innerHTML = modalBody;
      new bootstrap.Modal(document.getElementById("productEditModal")).show();
      initializeEditForm(product, productIndex);
    }

    function initializeEditForm(product, productIndex) {
      const form = document.getElementById("editProductForm");
      const stockSection = document.getElementById("editStockSection");
      const addStockBtn = document.getElementById("addStockBtn");

      // Generate initial stock cards
      if (!product.stock || product.stock.length === 0) {
        stockSection.appendChild(generateStockCard(productIndex, 0, {}, product));
      } else {
        product.stock.forEach((stockItem, stockIndex) => {
          stockSection.appendChild(generateStockCard(productIndex, stockIndex, stockItem, product));
        });
      }

      // Clear validation on input
      form.addEventListener("input", function(e) {
        if (e.target.classList.contains("is-invalid")) {
          clearInvalid(e.target);
        }
      }, true);

      // Add new stock card
      addStockBtn.addEventListener("click", function() {
        const lastCard = stockSection.querySelector(".card:last-of-type");
        if (lastCard && !validateStockCard(lastCard)) {
          return; // Don't add new card if last one is invalid
        }
        
        const newStockIndex = stockSection.children.length;
        stockSection.appendChild(generateStockCard(productIndex, newStockIndex, {}, product));
      });

      // Form submission
      form.addEventListener("submit", function(event) {
        event.preventDefault();
        event.stopPropagation();

        if (!validateForm(form, stockSection, productIndex, product)) {
          return;
        }

        const formData = new FormData(form);
        const updatedProduct = {
          id: product.id,
          name: formData.get("name"),
          category: formData.get("category"),
          subcategory: formData.get("subcategory"),
          price: parseFloat(formData.get("price")),
          material: formData.get("material"),
          brand: formData.get("brand"),
          description: formData.get("description"),
          sellerId: product.sellerId,
          status: product.status,
          stock: []
        };

        // Process stock data
        const stockCards = stockSection.querySelectorAll(".card");
        stockCards.forEach((card, stockIndex) => {
          const color = card.querySelector(`input[name*='[color]']`).value;
          const fileInput = card.querySelector(`input[name*='[images][]']`);
          const hiddenInput = card.querySelector(`input[name*='[existingImages]']`);
          
          const existingImages = hiddenInput.value ? 
            hiddenInput.value.split(", ").filter(img => img.trim()) : [];
          const newImages = fileInput.files ? Array.from(fileInput.files).map(f => f.name) : [];
          
          const sizes = [];
          card.querySelectorAll(".size-item").forEach(row => {
            const sizeInput = row.querySelector(`input[name*='[size]']`);
            const qtyInput = row.querySelector(`input[name*='[qty]']`);
            
            if (sizeInput?.value.trim() && qtyInput?.value.trim()) {
              sizes.push({
                size: sizeInput.value.trim(),
                name: sizeInput.value.trim(),
                qty: parseInt(qtyInput.value)
              });
            }
          });

          updatedProduct.stock.push({
            color,
            sizes,
            images: [...existingImages, ...newImages]
          });
        });
        let user = getCurrentUser()
        // Save to localStorage
        let products = localStore.read("products", []).filter(prod => prod.sellerId === user.id);
        products[productIndex] = updatedProduct;
        localStorage.setItem("products", JSON.stringify(products));
        
        loadProducts();
        bootstrap.Modal.getInstance(document.getElementById("productEditModal")).hide();
        createToast("Product updated successfully!", "success");
      });
    }

    function validateForm(form, stockSection, productIndex, product) {
      let isValid = true;

      // Validate basic fields
      const fields = [
        { element: form.querySelector("input[name='name']"), validator: validateName },
        { element: form.querySelector("input[name='brand']"), validator: validateName },
        // { element: form.querySelector("input[name='material']"), validator: validateName },
        { element: form.querySelector("input[name='price']"), validator: validatePrice },
        { element: form.querySelector("select[name='category']"), validator: validateRequired },
        { element: form.querySelector("input[name='subcategory']"), validator: validateRequired },
        { element: form.querySelector("textarea[name='description']"), validator: validateDescription }
      ];

      fields.forEach(({ element, validator }) => {
        if (!validator(element)) isValid = false;
      });

      // Validate stock cards
      const stockCards = stockSection.querySelectorAll(".card");
      if (stockCards.length === 0) {
        stockSection.appendChild(generateStockCard(productIndex, 0, {}, product));
        isValid = false;
      } else {
        stockCards.forEach(card => {
          if (!validateStockCard(card)) isValid = false;
        });
      }

      return isValid;
    }

    function validateName(input) {
      const value = input.value.trim();
      if (!value) {
        setInvalid(input, `${input.name} is required.`);
        return false;
      }
      if (!NAME_REGEX.test(value)) {
        setInvalid(input, `${input.name} must contain only letters (no numbers).`);
        return false;
      }
      if (value.length > 50) {
        setInvalid(input, `${input.name} must not exceed 50 characters.`);
        return false;
      }
      clearInvalid(input);
      return true;
    }

    function validatePrice(input) {
      const value = parseFloat(input.value);
      if (!value || value <= 0) {
        setInvalid(input, "Please enter a valid price.");
        return false;
      }
      clearInvalid(input);
      return true;
    }

    function validateRequired(input) {
      if (!input.value.trim()) {
        setInvalid(input, `${input.name || 'Field'} is required.`);
        return false;
      }
      clearInvalid(input);
      return true;
    }

    function validateDescription(input) {
      const value = input.value.trim();
      if (!value) {
        setInvalid(input, "Description is required.");
        return false;
      }
      // if (!NAME_REGEX.test(value)) {
      //   setInvalid(input, "Description must contain only letters (no numbers).");
      //   return false;
      // }
      if (value.length < 10) {
        setInvalid(input, "Description must be at least 10 characters.");
        return false;
      }
      clearInvalid(input);
      return true;
    }

    // Search functionality
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", function() {
      const searchTerm = this.value.trim().toLowerCase();
      const rows = document.querySelectorAll("#productTableBody tr");

      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const cleanSearch = searchTerm.replace("$", "");
        const prices = text.match(/[$]?\d+(\.\d+)?/g) || [];
        const numericText = prices.map(p => p.replace("$", "")).join(" ");

        row.style.display = (text.includes(searchTerm) || numericText.includes(cleanSearch)) ? "" : "none";
      });
    });

    // Initialize
    loadProducts();
  }
}