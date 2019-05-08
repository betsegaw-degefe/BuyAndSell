using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BuyAndSellApi.Models.Entities
{
    public partial class BuyAndSellContext : DbContext
    {
        public BuyAndSellContext()
        {
        }

        public BuyAndSellContext(DbContextOptions<BuyAndSellContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Address { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<LookupCategory> LookupCategory { get; set; }
        public virtual DbSet<LookupValue> LookupValue { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<ProductAttribute> ProductAttribute { get; set; }
        public virtual DbSet<ProductAttributeValue> ProductAttributeValue { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserRole> UserRole { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("Host=localhost;Database=buyandsell;Username=postgres;Password=betsegaw");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.3-servicing-35854");

            modelBuilder.Entity<Address>(entity =>
            {
                entity.HasIndex(e => e.ParentId)
                    .HasName("fki_fk_address_address");

                entity.Property(e => e.Id)
                    .HasDefaultValueSql("nextval('adress_id_seq'::regclass)");

                entity.Property(e => e.Active)
                    .HasDefaultValueSql("true");

                entity.Property(e => e.CreatedAt)
                    .HasDefaultValueSql("now()");


                entity.Property(e => e.LastUpdated)
                    .HasDefaultValueSql("now()");


                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_address_address");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("category");

                entity.HasIndex(e => e.ParentId)
                    .HasName("fki_fk_category_category");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasDefaultValueSql("true");

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("timestamp with time zone")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.CreatedBy).HasColumnName("created_by");

                entity.Property(e => e.LastUpdated)
                    .HasColumnName("last_updated")
                    .HasColumnType("timestamp with time zone")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.Level).HasColumnName("level");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(75);

                entity.Property(e => e.ParentId).HasColumnName("parent_id");

                entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .HasForeignKey(d => d.ParentId)
                    .HasConstraintName("fk_category_category");
            });

            modelBuilder.Entity<LookupCategory>(entity =>
            {
                entity.ToTable("lookup_category");

                entity.HasIndex(e => e.ParentId)
                    .HasName("fki_fk_lookup_category_lookup_category");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasDefaultValueSql("true");

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.CreatedBy).HasColumnName("created_by");

                entity.Property(e => e.LastUpdated)
                    .HasColumnName("last_updated")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.Level).HasColumnName("level");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.Property(e => e.ParentId).HasColumnName("parent_id");

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .HasForeignKey(d => d.ParentId)
                    .HasConstraintName("fk_lookup_category_lookup_category");
            });

            modelBuilder.Entity<LookupValue>(entity =>
            {
                entity.ToTable("lookup_value");

                entity.HasIndex(e => e.LcId)
                    .HasName("fki_fk_lookup_value_lookup_category");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasDefaultValueSql("true");

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.CreatedBy).HasColumnName("created_by");

                entity.Property(e => e.LastUpdated)
                    .HasColumnName("last_updated")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.LcId).HasColumnName("lc_id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.Property(e => e.Value)
                    .IsRequired()
                    .HasColumnName("value")
                    .HasMaxLength(50);

                entity.HasOne(d => d.Lc)
                    .WithMany(p => p.LookupValue)
                    .HasForeignKey(d => d.LcId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_lookup_value_lookup_category");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("order");

                entity.HasIndex(e => e.BuyerId)
                    .HasName("fki_fk_order_user");

                entity.HasIndex(e => e.ProductId)
                    .HasName("fki_fk_order_product");

                entity.HasIndex(e => e.SellerId)
                    .HasName("fki_fk_order_seller");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasDefaultValueSql("true");

                entity.Property(e => e.BuyerId).HasColumnName("buyer_id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.CreatedBy).HasColumnName("created_by");

                entity.Property(e => e.LastUpdated)
                    .HasColumnName("last_updated")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.OrderedQuantity).HasColumnName("ordered_quantity");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.SellerId).HasColumnName("seller_id");

                entity.HasOne(d => d.Buyer)
                    .WithMany(p => p.OrderBuyer)
                    .HasForeignKey(d => d.BuyerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_order_buyer");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Order)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_order_product");

                entity.HasOne(d => d.Seller)
                    .WithMany(p => p.OrderSeller)
                    .HasForeignKey(d => d.SellerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_order_seller");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("product");

                entity.HasIndex(e => e.StatusId)
                    .HasName("fki_fk_product_product_status");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasDefaultValueSql("true");

                entity.Property(e => e.Condition)
                    .IsRequired()
                    .HasColumnName("condition")
                    .HasMaxLength(10);

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.CreatedBy).HasColumnName("created_by");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasMaxLength(300);

                entity.Property(e => e.LastUpdated)
                    .HasColumnName("last_updated")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.Negotiable)
                    .HasColumnName("negotiable")
                    .HasDefaultValueSql("true");

                entity.Property(e => e.Price)
                    .HasColumnName("price")
                    .HasColumnType("money");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.StatusId).HasColumnName("status_id");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Product)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_product_lookup_value");
            });

            modelBuilder.Entity<ProductAttribute>(entity =>
            {
                entity.ToTable("product_attribute");

                entity.HasIndex(e => e.CategoryId)
                    .HasName("fki_fk_product_template_detail");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('product_template_detail_id_seq'::regclass)");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasDefaultValueSql("true");

                entity.Property(e => e.CategoryId).HasColumnName("category_id");

                entity.Property(e => e.CreatedAt).HasColumnName("created_at");

                entity.Property(e => e.CreatedBy).HasColumnName("created_by");

                entity.Property(e => e.DataType)
                    .IsRequired()
                    .HasColumnName("data_type")
                    .HasMaxLength(50);

                entity.Property(e => e.LastUpdated).HasColumnName("last_updated");

                entity.Property(e => e.LastUpdatedBy).HasColumnName("last_updated_by");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.Property(e => e.Unit)
                    .HasColumnName("unit")
                    .HasMaxLength(25);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.ProductAttribute)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_product_attribute_category");
            });

            modelBuilder.Entity<ProductAttributeValue>(entity =>
            {
                entity.ToTable("product_attribute_value");

                entity.HasIndex(e => e.ProductAttributeId)
                    .HasName("fki_fk_product_attribute_value_product_attribute");

                entity.HasIndex(e => e.ProductId)
                    .HasName("fki_fk_product_attribute_value_product");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('product_template_detail_value_id_seq'::regclass)");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasDefaultValueSql("true");

                entity.Property(e => e.LastUpdated)
                    .HasColumnName("last_updated")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.ProductAttributeId).HasColumnName("product_attribute_id");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.Value)
                    .IsRequired()
                    .HasColumnName("value")
                    .HasMaxLength(250);

                entity.HasOne(d => d.ProductAttribute)
                    .WithMany(p => p.ProductAttributeValue)
                    .HasForeignKey(d => d.ProductAttributeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_product_attribute_value_product_attribute");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductAttributeValue)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_product_attribute_value_product");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("role");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasDefaultValueSql("true");

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.CreatedBy).HasColumnName("created_by");

                entity.Property(e => e.LastUpdated)
                    .HasColumnName("last_updated")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.HasIndex(e => e.AddressId)
                    .HasName("fki_fk_user_address");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasDefaultValueSql("true");

                entity.Property(e => e.AddressId).HasColumnName("address_id");

                entity.Property(e => e.CreatedAt).HasColumnName("created_at");

                entity.Property(e => e.DateOfBirth).HasColumnName("date_of_birth");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(50);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("first_name")
                    .HasMaxLength(45);

                entity.Property(e => e.Gender).HasColumnName("gender");

                entity.Property(e => e.LastName)
                    .HasColumnName("last_name")
                    .HasMaxLength(45);

                entity.Property(e => e.LastOnline).HasColumnName("last_online");

                entity.Property(e => e.LastUpdated)
                    .HasColumnName("last_updated")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.MiddleName)
                    .HasColumnName("middle_name")
                    .HasMaxLength(45);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(100);

                entity.Property(e => e.PhoneNumber)
                    .HasColumnName("phone_number")
                    .HasMaxLength(15);

                entity.Property(e => e.ProfilePicture)
                    .IsRequired()
                    .HasColumnName("profile_picture")
                    .HasMaxLength(75);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasColumnName("user_name")
                    .HasMaxLength(50);

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.AddressId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_user_address");
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.HasKey(e => new {e.UserId, e.RoleId})
                    .HasName("user_role_pkey");

                entity.ToTable("user_role");

                entity.HasIndex(e => e.RoleId)
                    .HasName("fki_fk_user_role_role");

                entity.HasIndex(e => e.UserId)
                    .HasName("fki_fk_user_role_user");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasDefaultValueSql("true");

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.CreatedBy).HasColumnName("created_by");

                entity.Property(e => e.LastUpdated)
                    .HasColumnName("last_updated")
                    .HasDefaultValueSql("now()");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.UserRole)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_user_role_role");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserRole)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_user_role_user");
            });

            modelBuilder.HasSequence<int>("adress_id_seq");

            modelBuilder.HasSequence<int>("product_template_detail_id_seq");

            modelBuilder.HasSequence<int>("product_template_detail_value_id_seq");
        }
    }
}