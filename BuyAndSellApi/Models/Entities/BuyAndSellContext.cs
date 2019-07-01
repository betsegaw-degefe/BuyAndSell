using System;
using System.Reflection;
using BuyAndSellApi.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace BuyAndSellApi.Models.Entities
{
    public partial class BuyAndSellContext : DbContext
    {
        public BuyAndSellContext()
        {
        }

        public static string GetConnectionString()
        {
            return Startup.ConnectionString;
        }

        public BuyAndSellContext(DbContextOptions<BuyAndSellContext> options) : base(options)
        {
        }

        public virtual DbSet<Address> Address { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Cart> Cart { get; set; }
        public virtual DbSet<LookupCategory> LookupCategory { get; set; }
        public virtual DbSet<LookupValue> LookupValue { get; set; }
        public virtual DbSet<Offer> Offer { get; set; }
        public virtual DbSet<OrderProduct> Order { get; set; }
        public virtual DbSet<PaymentService> PaymentService { get; set; }
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
                var connection = GetConnectionString();
                optionsBuilder.UseNpgsql(connection);
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

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_address_address");
            });
            modelBuilder.Entity<Cart>(entity =>
            {
                entity.HasIndex(e => e.ProductId)
                    .HasName("fki_fk_cart_product");

                entity.Property((e => e.Id))
                    .HasDefaultValueSql("nextval('transaction.cart_id_seq'::regclass)");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Cart)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_cart_product");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasIndex(e => e.ParentId)
                    .HasName("fki_fk_category_category");

                entity.Property(e => e.Id)
                    .HasDefaultValueSql("nextval('category_id_seq'::regclass))");

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .HasConstraintName("fk_category_category");
            });

            modelBuilder.Entity<LookupCategory>(entity =>
            {
                entity.HasIndex(e => e.ParentId)
                    .HasName("fki_fk_lookup_category_lookup_category");

                entity.Property(e => e.Id)
                    .HasDefaultValueSql("nextval('lookup_category_id_seq'::regclass)");

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .HasConstraintName("fk_lookup_category_lookup_category");
            });

            modelBuilder.Entity<LookupValue>(entity =>
            {
                entity.HasIndex(e => e.LcId)
                    .HasName("fki_fk_lookup_value_lookup_category");

                entity.Property(e => e.Id)
                    .HasDefaultValueSql("nextval('lookup_value_id_seq'::regclass)");

                entity.HasOne(d => d.Lc)
                    .WithMany(p => p.LookupValue)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_lookup_value_lookup_category");
            });

            modelBuilder.Entity<Offer>(entity =>
            {
                entity.HasIndex(e => e.ProductId)
                    .HasName("fki_fk_offer_product");

                entity.Property(e => e.Id)
                    .HasDefaultValueSql("nextval('transaction.offer_id_seq'::regclass)");

                entity.Property(e => e.OfferPrice)
                    .HasColumnType("money");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Offer)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_offer_product");
            });

            modelBuilder.Entity<OrderProduct>(entity =>
            {
                entity.HasIndex(e => e.BuyerId)
                    .HasName("fki_fk_order_user");

                entity.HasIndex(e => e.ProductId)
                    .HasName("fki_fk_order_product");

                entity.HasIndex(e => e.SellerId)
                    .HasName("fki_fk_order_seller");

                entity.Property(e => e.Id)
                    .HasDefaultValueSql("nextval('order_id_seq'::regclass)");

                entity.HasOne(d => d.Buyer)
                    .WithMany(p => p.OrderBuyer)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_order_buyer");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Order)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_order_product");

                entity.HasOne(d => d.Seller)
                    .WithMany(p => p.OrderSeller)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_order_seller");
            });

            modelBuilder.Entity<PaymentService>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasDefaultValueSql("nextval('finance.payment_service_id_seq'::regclass)");

                entity.Property(e => e.Balance)
                    .HasColumnType("money");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasIndex(e => e.StatusId)
                    .HasName("fki_fk_product_lookup_value");

                entity.HasIndex(e => e.MainCategoryId)
                    .HasName("fki_fk_product_category");

                entity.Property(e => e.Id)
                    .HasDefaultValueSql("nextval('product_id_seq'::regclass)");

                entity.Property(e => e.Price)
                    .HasColumnType("money");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Product)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_product_lookup_value");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Product)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_product_category");

            });

            modelBuilder.Entity<ProductAttribute>(entity =>
            {
                entity.HasIndex(e => e.CategoryId)
                    .HasName("fki_fk_product_template_detail");

                entity.Property(e => e.Id)
                    .HasDefaultValueSql("nextval('product_template_detail_id_seq'::regclass)");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.ProductAttribute)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_product_attribute_category");
            });

            modelBuilder.Entity<ProductAttributeValue>(entity =>
            {
                entity.HasIndex(e => e.ProductAttributeId)
                    .HasName("fki_fk_product_attribute_value_product_attribute");

                entity.HasIndex(e => e.ProductId)
                    .HasName("fki_fk_product_attribute_value_product");

                entity.Property(e => e.Id)
                    .HasDefaultValueSql("nextval('product_template_detail_value_id_seq'::regclass)");

                entity.HasOne(d => d.ProductAttribute)
                    .WithMany(p => p.ProductAttributeValue)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_product_attribute_value_product_attribute");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductAttributeValue)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_product_attribute_value_product");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasDefaultValueSql("nextval('role_id_seq'::regclass)");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.AddressId)
                    .HasName("fki_fk_user_address");

                entity.Property(e => e.Id)
                    .HasDefaultValueSql("nextval('user_id_seq'::regclass)");

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.User)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_user_address");
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasDefaultValueSql("nextval('account.user_role_id_seq'::regclass)");

                entity.HasKey(e => new {e.UserId, e.RoleId})
                    .HasName("user_role_pkey");

                entity.HasIndex(e => e.RoleId)
                    .HasName("fki_fk_user_role_role");

                entity.HasIndex(e => e.UserId)
                    .HasName("fki_fk_user_role_user");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.UserRole)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_user_role_role");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserRole)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_user_role_user");
            });

            modelBuilder.HasSequence<int>("adress_id_seq");

            modelBuilder.HasSequence<int>("product_template_detail_id_seq");

            modelBuilder.HasSequence<int>("product_template_detail_value_id_seq");

            // Map property names to column names.
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                if (entity.ClrType.IsSubclassOf(typeof(BaseEntity)))
                {
                    modelBuilder.Entity(
                        entity.Name,
                        x =>
                        {
                            x.Property("CreatedAt")
                                .HasDefaultValueSql("now()");

                            x.Property("LastUpdated")
                                .HasDefaultValueSql("now()");
                        });
                }

                foreach (var property in entity.GetProperties())
                {
                    property.Relational().ColumnName = property.Name.ToUnderScoreCase();
                }
            }
        }
    }
}